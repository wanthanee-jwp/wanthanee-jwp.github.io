# Nuxt 4 Portfolio Architecture

## 1. Architecture Summary

Portfolio นี้ใช้สถาปัตยกรรมแบบ **static, content-driven single page** บน Nuxt 4 โดย render หน้า `/` ผ่าน SSR และสามารถ prerender เป็น static HTML สำหรับ deployment ได้ ข้อมูล Portfolio มาจาก `data/profile.json` เพียงแห่งเดียวและถูก import ตอน build โดยไม่เรียก API ที่ runtime

แนวทางหลักมีดังนี้

- ใช้ Nuxt 4 `app/` directory structure
- ใช้ Vue 3 Composition API และ `<script setup lang="ts">`
- ให้ `app/pages/index.vue` เป็น composition root ของหน้า
- แยก UI เป็น layout components, section components และ reusable content components
- อ่านข้อมูลผ่าน typed composable เพียงจุดเดียว
- เก็บ data transformation ที่ไม่เกี่ยวกับการ render ไว้ใน utility
- ใช้ CSS ปกติและ CSS custom properties โดยไม่ติดตั้ง UI framework
- ใช้ Nuxt built-ins สำหรับ SEO และ head management
- ไม่มี API layer, global state store หรือ runtime data fetching เพราะไม่จำเป็นกับ static portfolio

## 2. Requirements Analysis

### 2.1 Product Shape

- เว็บไซต์มี route เดียวคือ `/`
- เนื้อหาประกอบด้วย Home, About, Skills, Experience, Projects และ Contact
- Navigation ใช้ hash links ได้แก่ `#home`, `#about`, `#skills`, `#experience`, `#projects` และ `#contact`
- ข้อมูลปัจจุบันประกอบด้วย 6 หมวดทักษะ, ประสบการณ์ 1 รายการ, โปรเจกต์ 12 รายการ และช่องทางติดต่อ 3 รายการ
- Project `github` และ `demo` ในข้อมูลปัจจุบันเป็นค่าว่างทั้งหมด จึงต้องรองรับ conditional rendering โดยไม่สร้าง empty links
- Contact ของ GitHub/GitLab อยู่ในรูป handle เช่น `@wanthanee-jwp` จึงต้องมี transformation ก่อนนำไปใช้เป็น URL
- Content มีทั้งภาษาไทยและอังกฤษ แต่ยังไม่ต้องมีระบบหลายภาษา

### 2.2 Architectural Consequences

| Requirement | Architecture decision |
| --- | --- |
| Portfolio data แยกจาก UI | เก็บ canonical content ไว้ที่ root `data/profile.json`; UI รับข้อมูลผ่าน typed props |
| Simple architecture | ใช้ route เดียว, composable เดียว และ utility เฉพาะ logic ที่มีการแปลงค่า |
| Reusable components | แยก repeated items เป็น `SkillGroup`, `ExperienceItem`, `ProjectCard` และ `TagList` |
| Maintainability | กำหนด TypeScript model ให้ตรงกับ JSON และให้ page เป็นผู้ส่งข้อมูลเข้า section |
| Responsive | ใช้ mobile-first global CSS, shared container และ CSS Grid ที่ปรับ column ตามพื้นที่ |
| Basic SEO | ใช้ `useSeoMeta` และ `useHead` ใน page; SSR/prerender ทำให้ crawler เห็น content |
| No unnecessary dependencies | ใช้เฉพาะ Nuxt/Vue/TypeScript และ native CSS; ไม่ใช้ Pinia, UI kit, icon library หรือ SEO module ในระยะแรก |

### 2.3 Constraints and Assumptions

- `data/profile.json` เป็น canonical source ตาม `requirements.md`
- ไฟล์ `data/Profile_page_design/uploads/profile.json` ไม่ถูก import และไม่ถือเป็น production data
- Site URL ยังไม่ถูกระบุ จึงรับผ่าน `NUXT_PUBLIC_SITE_URL`; ไม่สร้าง canonical URL ปลอม
- หน้า Portfolio ไม่มี form submission, authentication, database หรือ server endpoint
- การเพิ่มหรือลด Skill, Experience หรือ Project ใน JSON ต้องแสดงผลได้โดยไม่เพิ่ม component ใหม่
- Text label ของ UI เช่นชื่อ navigation หรือคำว่า “View project” เป็น presentation copy ไม่ใช่ profile content จึงเก็บใกล้ UI ได้

### 2.4 Design Reference Analysis

โฟลเดอร์ `data/Profile_page_design/` เป็น visual reference สำหรับ implementation โดยมีองค์ประกอบสำคัญดังนี้

- `Wanthanee Profile.dc.html` เป็น source ที่อ่านโครงสร้าง layout, inline styles และ interaction intent ได้ชัดที่สุด
- `Wanthanee Profile - standalone.html` เป็น bundled preview artifact ไม่ใช่ source สำหรับนำโค้ดเข้า Nuxt
- `.thumbnail` เป็นภาพ preview ขนาด 640×385 ใช้ตรวจ visual direction ระดับภาพรวม
- `support.js` เป็น runtime ของ design artifact และต้องไม่ถูก copy, import หรือเพิ่มใน production bundle
- `uploads/*.json` เป็นสำเนาข้อมูลของ design artifact ไม่ใช่ canonical content

Visual language ที่ต้องรักษา:

- หน้าแบบ technical résumé ที่เรียบง่ายและเน้นข้อมูล
- พื้นหลัง neutral gray อ่อน, text charcoal และ accent สี mint/green
- Content container กว้างสูงสุดประมาณ 1140px
- Heading ใช้ sans-serif น้ำหนักชัด ส่วน metadata, dates, links และ tags ใช้ monospace
- Section แบ่งด้วยเส้น border บางและ vertical spacing ที่สม่ำเสมอ
- Specialization เป็น outlined pill
- Skills และ technologies เป็น compact filled tags
- Skills ใช้ auto-fit grid; Projects ใช้ card grid
- Experience ใช้สองคอลัมน์บนจอกว้าง: ข้อมูลตำแหน่งทางซ้ายและ responsibilities ทางขวา
- Project cards แสดง role, name, description, highlights และ technology tags
- Inline line icons ใช้เป็น visual cue ขนาดเล็ก ไม่ใช่องค์ประกอบหลัก

จุดที่ design reference ต้องถูกปรับเพื่อให้ตรงกับ requirements:

- Design ไม่มี navigation จึงเพิ่ม compact section navigation โดยรักษา visual weight ให้เบา
- Header ของ design รวม hero และ contact preview; ใน Nuxt ให้ Home ยังคงรูปแบบนี้ได้ แต่ต้องมี Contact section แยกท้ายหน้าเพื่อรองรับ anchor และ requirement
- ชื่อ `Summary` ใน design map เป็น About section และใช้ `id="about"`
- ต้องเพิ่ม section `id`, semantic headings, skip link, focus states และ back-to-top link
- Experience grid ต้องเปลี่ยนเป็นหนึ่งคอลัมน์บนจอแคบ
- Project grid ค่า `minmax(320px, 1fr)` ต้องปรับให้ไม่ overflow ที่ viewport 320px
- Design ใช้ Google Fonts แต่ implementation เริ่มจาก system font stacks เพื่อลด external dependency/network request; เพิ่ม hosted fonts ภายหลังได้เฉพาะเมื่อยืนยันว่าจำเป็น
- Design ซ่อน highlights หลังข้อที่ 3 ด้วย JavaScript state; implementation ใช้ native disclosure (`details`/`summary`) สำหรับข้อที่เหลือ เพื่อให้เนื้อหายังอยู่ใน SSR HTML และไม่ต้องมี shared state
- Design artifact hard-code ข้อมูลซ้ำใน script; implementation ต้องอ่านเฉพาะ `data/profile.json`
- Design external links ใช้ `rel="noopener"`; implementation ใช้ `rel="noopener noreferrer"` ตาม requirement

ลำดับความสำคัญเมื่อ design ขัดกับเอกสารอื่นคือ `requirements.md` → accessibility/responsive correctness → visual reference

## 3. Proposed Directory Structure

```text
.
├── app/
│   ├── app.vue
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppFooter.vue
│   │   │   └── AppHeader.vue
│   │   ├── sections/
│   │   │   ├── AboutSection.vue
│   │   │   ├── ContactSection.vue
│   │   │   ├── ExperienceSection.vue
│   │   │   ├── HomeSection.vue
│   │   │   ├── ProjectsSection.vue
│   │   │   └── SkillsSection.vue
│   │   └── ui/
│   │       ├── AppIcon.vue
│   │       ├── ExperienceItem.vue
│   │       ├── ProjectCard.vue
│   │       ├── SectionHeading.vue
│   │       ├── SkillGroup.vue
│   │       └── TagList.vue
│   ├── composables/
│   │   └── useProfile.ts
│   ├── pages/
│   │   └── index.vue
│   ├── types/
│   │   └── profile.ts
│   └── utils/
│       └── contact-links.ts
├── data/
│   ├── Profile_page_design/       # design reference only; excluded from runtime
│   └── profile.json               # canonical content
├── public/
│   └── favicon.svg
├── .env.example
├── .gitignore
├── architecture.md
├── nuxt.config.ts
├── package.json
├── requirements.md
└── tsconfig.json
```

`public/favicon.svg` เป็น optional asset หากยังไม่มี asset ที่เหมาะสมสามารถไม่สร้างในรอบแรกได้ ส่วน `robots.txt` และ `sitemap.xml` จะเพิ่มเมื่อกำหนด production URL แล้วเท่านั้นตาม requirement

## 4. Module Responsibilities

### 4.1 Root Configuration

#### `nuxt.config.ts`

- กำหนด compatibility และ Nuxt application configuration
- เปิด global stylesheet `~/assets/css/main.css`
- กำหนด default HTML attributes เช่น `lang`
- ประกาศ public runtime config สำหรับ `siteUrl`
- รักษา SSR เป็นค่าเริ่มต้นของ Nuxt
- กำหนด prerender route `/` หากเลือก static deployment
- ไม่เก็บ content ของ Portfolio หรือ metadata ที่สร้างได้จาก profile ไว้ในไฟล์นี้

#### `package.json`

- มี scripts ขั้นต่ำ `dev`, `build`, `generate`, `preview` และ `typecheck`
- dependencies หลักมีเพียง `nuxt`
- ไม่เพิ่ม library สำหรับ state, CSS, icons หรือ metadata เว้นแต่เกิด requirement ใหม่ที่ native solution รองรับไม่ได้

#### `tsconfig.json`

- extend configuration ที่ Nuxt สร้างให้
- เปิดหรือคง strict type checking
- ไม่ประกาศ alias ซ้ำกับ Nuxt หากไม่จำเป็น

#### `.env.example`

- อธิบาย `NUXT_PUBLIC_SITE_URL` สำหรับ canonical และ Open Graph URL
- ใส่เฉพาะ placeholder เช่น `https://example.com` พร้อมคำอธิบาย ไม่ใส่ secret หรือ production credential

### 4.2 Application Shell

#### `app/app.vue`

- เป็น root application shell
- render `<NuxtPage />`
- ไม่อ่าน profile data และไม่ประกอบ sections
- เหมาะสำหรับ markup ที่เป็น global จริง ๆ เท่านั้น เช่น skip link หากต้องการให้ทุก route ใช้ร่วมกัน

#### `app/pages/index.vue`

- เป็น composition root ของ Portfolio
- เรียก `useProfile()` เพียงครั้งเดียว
- กำหนด page-level SEO ด้วย `useSeoMeta()` และ `useHead()`
- สร้าง Person JSON-LD จาก typed profile data
- compose `AppHeader`, section ทั้ง 6 และ `AppFooter` ตามลำดับ
- ส่งเฉพาะข้อมูลที่แต่ละ section ต้องใช้ผ่าน props
- เป็นเจ้าของ `<main>` และ heading hierarchy ระดับหน้า
- ไม่มี markup ของ card/item ที่ทำซ้ำ

### 4.3 Data and Type Layer

#### `data/profile.json`

- เป็น single source of truth ของ Profile, Summary, Skills, Experience, Projects และ Contact
- เป็น content เท่านั้น ไม่มี CSS class, HTML string หรือ presentation state
- ไม่ถูกแก้รูปแบบเพียงเพื่อให้ component ใด component หนึ่ง render ง่ายขึ้น หากโครงสร้างปัจจุบันยังอธิบาย domain ได้ดี

#### `app/types/profile.ts`

ประกาศ domain types ต่อไปนี้

- `PortfolioData`
- `Profile`
- `SkillCategory`
- `Experience`
- `Project`
- `Contact`
- `ContactLink` สำหรับ view model ที่ utility สร้างขึ้น

Field ที่เป็น URL ใน JSON ใช้ `string` เพราะข้อมูลจริงอาจเป็นค่าว่าง การตรวจว่ามี link ใช้งานได้เกิดก่อน render ไม่บังคับ type ให้ข้อมูลที่มีอยู่ไม่ตรงความจริง

#### `app/composables/useProfile.ts`

- import JSON ผ่าน root alias เช่น `~~/data/profile.json`
- type-check JSON เป็น `PortfolioData`
- คืนข้อมูลแบบ readonly เพื่อป้องกัน UI mutation โดยไม่ตั้งใจ
- ไม่ fetch ข้อมูล, ไม่ใช้ `useState` และไม่สร้าง reactive state ที่ไม่จำเป็น
- ไม่คำนวณ presentation-specific values

รูปแบบ public contract ที่ตั้งใจไว้:

```ts
interface UseProfileResult {
  profile: Readonly<PortfolioData>
}
```

หาก TypeScript ตรวจ JSON import กับ interface ได้ครบ สามารถใช้ object reference เดิมได้ ไม่ต้อง clone data

#### `app/utils/contact-links.ts`

- แปลง email เป็น `mailto:` URL
- normalize GitHub/GitLab handle โดยตัด `@` ด้านหน้า
- สร้าง URL เต็มของ GitHub และ GitLab
- คืน `ContactLink[]` ที่มี label, href และชนิด external/email
- เป็น pure functions เพื่อให้ทดสอบง่ายและไม่ผูกกับ Vue/Nuxt
- ข้ามค่าที่ว่างแทนการคืน link ที่ใช้ไม่ได้

### 4.4 Layout Components

#### `app/components/layout/AppHeader.vue`

- render `<header>` และ `<nav>`
- แสดงชื่อเจ้าของ Portfolio และ navigation links ทั้ง 6 รายการ
- ใช้ hash link ธรรมดาเพื่อให้ทำงานได้โดยไม่พึ่ง client JavaScript
- จัด mobile navigation แบบ wrap หรือ horizontal scroll ที่ควบคุมได้ โดยไม่จำเป็นต้องมี hamburger state
- ไม่มี profile data access โดยตรง; รับชื่อผ่าน prop
- รักษาหน้าตา compact/technical จาก design และไม่ทำให้ navigation แข่งกับ hero content

#### `app/components/layout/AppFooter.vue`

- render `<footer>`
- รับชื่อเจ้าของ Portfolio ผ่าน prop
- คำนวณปีปัจจุบันภายใน component เพราะเป็น presentation value
- แสดง link กลับ `#home`

### 4.5 Section Components

Section component แต่ละตัวมีหน้าที่กำหนด semantic section, section heading และ layout ของข้อมูลระดับ section เท่านั้น โดยไม่ import JSON เอง

#### `HomeSection.vue`

- รับ `Profile` และข้อความ summary แบบสั้นผ่าน props
- render `h1` เพียงหนึ่งรายการของหน้า
- แสดงชื่อ ตำแหน่ง ประสบการณ์ บริษัท และ location
- มี CTA ไป `#projects` และ `#contact`
- ใช้ header composition จาก design: identity block ทางซ้ายและ contact preview ทางขวาบนจอกว้าง ก่อน stack บน mobile
- แสดง specialization pills ใต้ hero content

#### `AboutSection.vue`

- รับ summary และ specialization
- render summary เป็น plain text
- ใช้ `TagList` สำหรับ specialization
- ใช้ visual section label แบบ `SUMMARY` จาก design แต่ semantic/navigation identity ยังคงเป็น About

#### `SkillsSection.vue`

- รับ `SkillCategory[]`
- render แต่ละหมวดด้วย `SkillGroup`
- รับผิดชอบ responsive grid ของหมวดทักษะ

#### `ExperienceSection.vue`

- รับ `Experience[]`
- render แต่ละรายการด้วย `ExperienceItem`
- รักษาลำดับตาม JSON และไม่คำนวณคำว่า `Present`
- ใช้ two-column item layout ตาม design บนจอกว้างและเปลี่ยนเป็น single column บน mobile

#### `ProjectsSection.vue`

- รับ `Project[]`
- render แต่ละรายการด้วย `ProjectCard`
- รับผิดชอบ responsive project grid
- ไม่กรองหรือตัดจำนวนโปรเจกต์
- แสดงจำนวนโปรเจกต์จาก `projects.length` ใน section heading ตาม design

#### `ContactSection.vue`

- รับ `ContactLink[]` ที่ผ่าน transformation แล้ว
- render email และ external profile links
- ไม่รู้รายละเอียดการสร้าง URL และไม่มี contact form
- ใช้ presentation ที่กระชับตาม contact block ใน design และอาจแสดงข้อมูลเดียวกับ hero ซ้ำเพื่อให้ `#contact` เป็นปลายทางที่สมบูรณ์

### 4.6 Reusable UI Components

#### `AppIcon.vue`

- เก็บ inline SVG line icons ที่ถอดจาก visual language ของ design
- รับชื่อ icon ผ่าน union type ที่จำกัด เช่น `layers`, `summary`, `code`, `briefcase`, `folder`, `mail` และ `link`
- SVG เป็น decorative โดย default ใช้ `aria-hidden="true"`; ข้อความข้าง icon เป็น accessible label
- ไม่เพิ่ม icon library dependency

#### `SectionHeading.vue`

- render heading และ optional description ของ section ในรูปแบบเดียวกัน
- รับ heading level ที่จำกัดหรือใช้ `h2` เป็น contract คงที่สำหรับ section
- ไม่รับ raw HTML

#### `SkillGroup.vue`

- รับ `SkillCategory`
- render category heading และรายการ skills
- ไม่กำหนดตำแหน่ง grid ของตัวเอง เพื่อให้ parent section ควบคุม layout

#### `ExperienceItem.vue`

- รับ `Experience`
- render company, position, date text และ responsibilities ด้วย semantic markup
- เป็น article/item ที่นำกลับมาใช้ได้เมื่อข้อมูลประสบการณ์เพิ่มขึ้น

#### `ProjectCard.vue`

- รับ `Project`
- render name, role, description, highlights และ technology tags
- แสดง GitHub/Demo เฉพาะ URL ที่ผ่านเงื่อนไข non-empty
- กำหนด `target="_blank"` และ `rel="noopener noreferrer"` ให้ external project links
- ใช้ `TagList` แทนการทำ tag markup ซ้ำ
- แสดง highlights 3 ข้อแรกทันที และใส่ข้อที่เหลือใน native `details`/`summary` เมื่อมีมากกว่า 3 ข้อ
- label ของ disclosure แสดงจำนวนข้อที่เหลือ เช่น `+2 more`; ทุก highlight ยังอยู่ใน SSR HTML

#### `TagList.vue`

- รับ `readonly string[]` และ optional accessible label
- render list ของ tags ด้วย semantic `<ul>`/`<li>`
- ใช้ร่วมกันสำหรับ specialization และ technologies
- ไม่รู้ความหมายทาง domain ของแต่ละ tag

### 4.7 Styling

#### `app/assets/css/main.css`

- เก็บ reset/base styles, typography, CSS custom properties และ shared layout utilities
- มี design tokens สำหรับ colors, spacing, content width, borders และ focus ring
- ใช้ mobile-first styles
- มี shared `.container` และ section spacing
- กำหนด `scroll-margin-top` สำหรับ hash navigation
- มี visible `:focus-visible` state
- รองรับ `prefers-reduced-motion`
- component-specific layout ที่ใช้เฉพาะ component เดียวให้อยู่ใน `<style scoped>` ของ component นั้น
- แปลง inline style จาก design เป็น semantic class และ design tokens แทนการ copy style attribute
- เริ่มต้นด้วย token ใกล้เคียง reference: neutral page/card surfaces, charcoal text, mint accent, subtle border, radius 4–10px และ container 1140px
- ใช้ system sans stack และ system monospace stack โดยให้ font ไทย fallback เป็น system font ที่มีอยู่

ไม่สร้าง utility-class framework ภายในโปรเจกต์ เพราะจะเพิ่ม abstraction โดยไม่จำเป็นสำหรับหน้าเดียว

## 5. Data Flow

```text
data/profile.json
        │
        ▼
useProfile() ───────────────► index.vue ─────────► SEO / JSON-LD
                                  │
                ┌─────────────────┼─────────────────┐
                ▼                 ▼                 ▼
          Home/About         List Sections      AppHeader/Footer
                                  │
                                  ▼
                    SkillGroup / ExperienceItem /
                    ProjectCard / TagList

contact data ──► contact-links utility ──► ContactSection
```

กฎของ data flow:

- ไหลจาก page ลง component ผ่าน props ทางเดียว
- Child component ไม่แก้ไขข้อมูล
- Component ไม่ import `profile.json` โดยตรง
- ไม่มี event bus หรือ global mutable state
- Transformation ทำก่อนถึง presentation component

## 6. Component Contracts

| Component | Required input | Output responsibility |
| --- | --- | --- |
| `AppHeader` | `name` | Header และ section navigation |
| `AppFooter` | `name` | Copyright และ back-to-top link |
| `AppIcon` | constrained icon `name` | Decorative inline SVG ตาม design language |
| `HomeSection` | `profile`, summary excerpt | Hero content และ CTA |
| `AboutSection` | `summary`, `specialization` | About text และ specialization tags |
| `SkillsSection` | `skills` | Skill category grid |
| `SkillGroup` | `skill` | Skill category card |
| `ExperienceSection` | `experience` | Experience list |
| `ExperienceItem` | `experience` | Experience article |
| `ProjectsSection` | `projects` | Project grid |
| `ProjectCard` | `project` | Project content และ optional links |
| `ContactSection` | `links` | Contact link list |
| `TagList` | `items`, optional label | Generic semantic tag list |

Props ใช้ domain types โดยตรงเมื่อไม่มี transformation และใช้ view-model type เมื่อ UI ไม่ควรรู้รูปแบบข้อมูลต้นทาง เช่น `ContactLink`

## 7. Responsive Design Strategy

- เริ่มจาก single-column layout ที่ 320px
- Header navigation ใช้ flex wrap เพื่อให้ทุก link เข้าถึงได้โดยไม่ต้องเพิ่ม JavaScript state
- Skills และ Projects ใช้ `repeat(auto-fit, minmax(...))` หรือ breakpoint จำนวนน้อย
- Card ใช้ `min-width: 0` และ text wrapping เพื่อป้องกัน overflow จากชื่อเทคโนโลยี
- Container ใช้ fluid side padding และกำหนด `max-width`
- ไม่ยึดติด device-specific breakpoints; เพิ่ม breakpoint เมื่อ content ต้องการ
- ตรวจอย่างน้อยที่ 320px, 768px และ 1280px
- Hero/contact block เปลี่ยนจาก side-by-side เป็น stacked layout และ contact links ชิดซ้ายบน mobile
- Experience เปลี่ยนจาก `220px 1fr` เป็นหนึ่งคอลัมน์เมื่อพื้นที่ไม่พอ
- Project grid ใช้ `minmax(min(100%, 20rem), 1fr)` หรือ equivalent เพื่อแก้ overflow จาก reference ที่ 320px

## 8. SEO and Rendering Strategy

### Rendering

- คง `ssr: true` ตาม default ของ Nuxt
- ไม่มี client-side fetch เพราะ JSON รวมอยู่ใน build
- สำหรับ static host ใช้ `nuxt generate` และ prerender `/`
- สำหรับ Node host ใช้ `nuxt build`; architecture ของ component ไม่เปลี่ยน

### Page Metadata

`app/pages/index.vue` สร้าง metadata จาก profile:

- Title: `Wanthanee Pansrisuk | Backend Developer`
- Description: ตัด summary ให้เหมาะกับ meta description โดยไม่เปลี่ยน source data
- Open Graph: title, description, type และ URL
- Twitter Card: `summary`
- Canonical: สร้างเมื่อ `siteUrl` มีค่าเท่านั้น
- JSON-LD: `Person` พร้อม name, jobTitle, address country และ `sameAs` เฉพาะ URL ที่ถูกต้อง

เลือกภาษาหลักของเอกสารให้สอดคล้องกับ UI copy ตอน implement เนื่องจาก content เป็นสองภาษา หาก UI ใช้ภาษาอังกฤษเป็นหลักให้กำหนด `lang="en"`; ภาษาไทยเป็นหลักให้ใช้ `lang="th"`

### Robots and Sitemap

Portfolio มีหน้าเดียว จึงยังไม่ต้องเพิ่ม Nuxt SEO modules หาก production URL ถูกกำหนดแล้ว สามารถสร้าง static `robots.txt` และ `sitemap.xml` ได้โดยตรงหรือประเมิน module อีกครั้งเมื่อมีหลาย routes

## 9. Accessibility Strategy

- มี skip link ไป `<main>`
- `h1` อยู่ใน Home และ section headings ใช้ `h2`
- ใช้ `<article>` สำหรับ Experience และ Project items
- Lists ใช้ `<ul>`/`<li>` แทนกลุ่ม `<div>` เมื่อข้อมูลมีลักษณะเป็นรายการ
- Native anchor ใช้สำหรับ navigation และ CTA ไม่สร้าง button ที่จำลอง link
- Focus state มองเห็นได้ทุก interactive element
- External links มีชื่อที่ระบุปลายทางและไม่ใช้ข้อความกำกวมเพียง “Click here”
- สีตั้งเป้า WCAG AA และไม่ใช้สีเพียงอย่างเดียวในการสื่อความหมาย
- Smooth scrolling เปิดเฉพาะผู้ใช้ที่ไม่ได้ขอ reduced motion

## 10. Dependency Policy

### Initial Dependencies

- `nuxt`
- package ที่ Nuxt ติดตั้งเป็น transitive dependencies เท่านั้น

### Deliberately Excluded

- Pinia: ไม่มี shared mutable state
- Axios: ไม่มี HTTP request
- Tailwind/UI framework: native CSS เพียงพอสำหรับ UI แบบเรียบง่าย
- Icon library: ใช้ text links หรือ local SVG เมื่อจำเป็น
- Form library: ไม่มี form
- Runtime schema validator: JSON อยู่ใน repository และตรวจด้วย TypeScript/build process ได้ใน scope ปัจจุบัน
- SEO module: หน้าเดียวสามารถใช้ Nuxt head composables และ static files ได้

Dependency ใหม่ต้องเพิ่มเมื่อมี use case ที่ชัดเจน, native solution ไม่เพียงพอ และประโยชน์มากกว่าค่า maintenance

## 11. Validation Strategy

ก่อนถือว่า implementation เสร็จ ต้องตรวจดังนี้

1. `nuxt typecheck` ผ่านและไม่มี `any` ที่ไม่ได้อธิบาย
2. `nuxt build` และ `nuxt generate` ผ่านตาม deployment target
3. Rendered HTML มีทั้ง 6 sections และข้อมูลจาก JSON ครบ
4. Project ที่ URL ว่างไม่สร้าง anchor element
5. Contact utility แปลง email และ handles เป็น URL ถูกต้อง
6. Hash navigation และ direct hash URL ทำงานโดย heading ไม่ถูก header บัง
7. ไม่มี horizontal overflow ที่ 320px, 768px และ 1280px
8. Keyboard navigation, focus state และ heading order ถูกต้อง
9. HTML response มี title, description, Open Graph และ Person JSON-LD
10. Canonical/`og:url` ไม่ถูกสร้างด้วย placeholder เมื่อไม่มี `siteUrl`
11. Visual comparison รักษา hierarchy, spacing, colors, typography roles, chip styles และ card layout จาก `.thumbnail`/`.dc.html`
12. ไม่มี `support.js`, bundled standalone runtime หรือ duplicated upload JSON ถูก import ใน Nuxt application

Automated unit tests ยังไม่ใช่ dependency บังคับในรอบแรก หากเพิ่ม test runner ภายหลัง ให้เริ่มทดสอบ pure utility `contact-links.ts` และ conditional link behavior ซึ่งมีความเสี่ยงมากกว่า presentational markup

## 12. Implementation Plan and Status

Architecture นี้ถูกนำไป implement แล้วตามลำดับงานต่อไปนี้ และยังใช้เป็นขอบเขตสำหรับการเปลี่ยนแปลงรอบถัดไป

1. **Project foundation:** scaffold Nuxt 4, configuration, scripts และ global CSS entry
2. **Design foundation:** แปลงสี, spacing, typography, container, borders และ focus states จาก reference เป็น CSS tokens โดยไม่ copy inline styles
3. **Data foundation:** สร้าง domain types, readonly data composable และ contact utility โดยใช้ `data/profile.json` เท่านั้น
4. **Application shell:** สร้าง skip link, compact navigation, page composition และ footer
5. **Hero and content sections:** implement Home/About, Skills และ Experience ตาม layout reference พร้อม semantic markup
6. **Projects:** implement responsive cards, technology tags, optional links และ native disclosure สำหรับ highlights ที่เหลือ
7. **Contact:** implement dedicated contact section พร้อม reuse transformed contact links จาก hero
8. **SEO:** เพิ่ม metadata, conditional canonical, Open Graph และ Person JSON-LD
9. **Verification:** typecheck/build, responsive checks ที่ 320/768/1280px, keyboard/accessibility checks และ visual comparison กับ reference

แต่ละชุดควรตรวจ typecheck/build และ review diff ก่อนดำเนินการชุดถัดไป เพื่อให้กระบวนการ AI-assisted development ตรวจสอบและย้อนกลับได้ง่าย

สถานะปัจจุบัน: foundation, data layer, application shell, sections, reusable UI, responsive styling, SEO และ production verification ถูก implement ครบแล้ว Visual verification ผ่าน source/thumbnail comparison; การตรวจด้วย interactive browser ควรทำซ้ำเมื่อ browser preview พร้อมใช้งาน

### Design-to-Nuxt Mapping

| Design element | Nuxt implementation target |
| --- | --- |
| Header identity block | `HomeSection.vue` |
| Header contact links | `HomeSection.vue` โดยรับ transformed `ContactLink[]` |
| Specialization outline pills | `TagList.vue` variant `outline` |
| Summary section | `AboutSection.vue` |
| Section icon + uppercase label | `SectionHeading.vue` + `AppIcon.vue` |
| Skill category grid | `SkillsSection.vue` + `SkillGroup.vue` |
| Two-column experience row | `ExperienceItem.vue` |
| Project count and card grid | `ProjectsSection.vue` |
| Project highlight expansion | `ProjectCard.vue` native disclosure |
| Technology chips | `TagList.vue` variant `compact` |
| Contact block | `ContactSection.vue` |
| Bottom identity row | `AppFooter.vue` พร้อมปีปัจจุบันและ back-to-top |

Design files เป็น reference input เท่านั้น ไม่ถูก serve จาก `public/`, ไม่ถูก import เข้า application และไม่เป็นแหล่งข้อมูล runtime
