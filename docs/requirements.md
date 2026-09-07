# Developer Portfolio Requirements

## 1. ภาพรวมโครงการ

พัฒนาเว็บไซต์ Developer Portfolio แบบ single-page สำหรับ **Wanthanee Pansrisuk — Backend Developer** โดยใช้ข้อมูลจาก `data/profile.json` เป็นแหล่งข้อมูลหลัก เว็บไซต์มีไว้แนะนำตัว ทักษะ ประสบการณ์ โปรเจกต์ และช่องทางติดต่อ

เป้าหมายหลักของโครงการคือทดลองกระบวนการ **AI-assisted development** จึงให้ความสำคัญกับโครงสร้างที่เรียบง่าย การนำ component กลับมาใช้ซ้ำ การบำรุงรักษา ความสามารถในการแสดงผลบนหลายขนาดหน้าจอ และ SEO ขั้นพื้นฐาน มากกว่างานออกแบบ UI ที่ซับซ้อน

## 2. Technology Stack

- Nuxt 4
- Vue 3 Composition API
- TypeScript โดยเปิดใช้ strict type checking
- CSS ปกติ, scoped CSS หรือ Nuxt CSS configuration
- ใช้ Nuxt built-in features ก่อนเพิ่ม third-party dependency
- Package manager ให้ใช้ตัวเดียวตลอดโครงการ โดยเลือกตาม lockfile ที่มีอยู่

## 3. Scope

เว็บไซต์ต้องประกอบด้วย section ต่อไปนี้ในหน้า `/`

1. Home
2. About
3. Skills
4. Experience
5. Projects
6. Contact

Navigation ต้องเชื่อมไปยังแต่ละ section ด้วย anchor link เช่น `/#about` และ URL ของ section ต้องสามารถคัดลอกหรือเปิดโดยตรงได้

### Out of Scope

- CMS หรือระบบหลังบ้าน
- Authentication และ authorization
- Database และ server API สำหรับจัดการข้อมูล Portfolio
- Blog
- Animation ที่ซับซ้อน
- Theme system ที่ซับซ้อน
- Contact form ที่ส่งข้อมูลจริง
- Analytics และ tracking
- Project detail page
- ระบบค้นหา กรอง หรือแบ่งหน้ารายการโปรเจกต์
- การแปลหลายภาษา

## 4. Content Source

- ใช้ `data/profile.json` เป็น single source of truth สำหรับข้อมูล Profile, Summary, Skills, Experience, Projects และ Contact
- ห้ามคัดลอกข้อมูลเดียวกันไป hard-code ซ้ำในหลาย component
- สร้าง TypeScript types/interfaces ที่สอดคล้องกับ JSON เพื่อให้ตรวจสอบ schema ขณะพัฒนาได้
- UI ต้องรองรับ array ว่างและค่า URL ว่างโดยไม่เกิด error หรือแสดง link ที่ใช้งานไม่ได้
- โปรเจกต์ที่มี `github` หรือ `demo` เป็นค่าว่างต้องไม่แสดงปุ่มของ field นั้น
- เนื้อหาภายใน JSON อาจมีทั้งภาษาไทยและอังกฤษ UI ต้องแสดงผล Unicode ได้ถูกต้อง
- หากข้อมูลเพิ่มหรือลด เช่น หมวด Skill หรือ Project ใหม่ หน้าเว็บต้องปรับตามข้อมูลโดยไม่ต้องสร้าง component ใหม่

หมายเหตุ: มีไฟล์สำเนาที่ `data/Profile_page_design/uploads/profile.json` ซึ่งต่างจากไฟล์หลักเล็กน้อย แต่ requirement นี้กำหนดให้ `data/profile.json` เป็น canonical source เพื่อไม่ให้เกิดข้อมูลสองชุดระหว่างพัฒนา

## 5. Functional Requirements

### 5.1 Global Header and Navigation

- แสดงชื่อย่อหรือชื่อเจ้าของ Portfolio และรายการ navigation ครบทั้ง 6 section
- คลิก navigation แล้วเลื่อนไปยัง section ที่เกี่ยวข้อง
- แสดงสถานะ focus ที่มองเห็นชัดสำหรับผู้ใช้ keyboard
- บนหน้าจอขนาดเล็ก navigation ต้องไม่ล้น viewport และยังเข้าถึงทุกเมนูได้
- Header อาจเป็น sticky ได้ แต่ต้องไม่บังหัวข้อเมื่อเปิด anchor URL

### 5.2 Home

- แสดงชื่อ `Wanthanee Pansrisuk`
- แสดงตำแหน่ง `Backend Developer`
- แสดงข้อความแนะนำสั้นจากข้อมูล profile หรือ summary
- แสดงข้อมูลสำคัญ ได้แก่ประสบการณ์ 6 ปี สถานที่ทำงานปัจจุบัน และ location
- มี call to action อย่างน้อย 2 รายการ: ไปยัง Projects และ Contact

### 5.3 About

- แสดง summary ฉบับเต็ม
- แสดง specialization ทั้งหมดเป็น list หรือ tag
- จัดโครงสร้างเนื้อหาให้อ่านง่ายโดยไม่ใช้ข้อความจาก JSON เป็น HTML ดิบ

### 5.4 Skills

- แสดงทุกหมวดจาก `skills`
- แต่ละหมวดแสดงชื่อ category และรายการทักษะทั้งหมด
- ใช้ component เดียวกันสำหรับทุกหมวด
- ต้องรองรับชื่อทักษะและจำนวนรายการที่เปลี่ยนแปลงได้

### 5.5 Experience

- แสดงประสบการณ์ทั้งหมดเรียงตามลำดับที่ปรากฏในข้อมูล
- แต่ละรายการแสดง company, position, ช่วงเวลา และ responsibilities
- ใช้ semantic time/text ที่อ่านเข้าใจได้
- ไม่คำนวณหรือแทนค่า `Present` โดยอัตโนมัติจากวันที่ปัจจุบัน

### 5.6 Projects

- แสดงโปรเจกต์ทั้ง 12 รายการจากข้อมูลหลัก
- แต่ละ Project Card ต้องแสดง name, description, role, highlights และ technologies
- แสดง GitHub/Demo link เฉพาะเมื่อมี URL ที่ไม่ว่าง
- External link ต้องเปิดแท็บใหม่และใช้ `rel="noopener noreferrer"`
- ใช้ component เดียวสำหรับทุกโปรเจกต์
- รายการต้องอ่านและใช้งานได้ทั้ง desktop และ mobile โดยไม่เกิด horizontal overflow

### 5.7 Contact

- แสดง email, GitHub และ GitLab จากข้อมูลหลัก
- Email ต้องใช้ `mailto:`
- GitHub/GitLab handle ต้องแปลงเป็น URL ที่ใช้งานได้ โดยแยก logic การสร้าง URL ออกจาก presentation component
- External profile link ต้องเปิดแท็บใหม่และใช้ `rel="noopener noreferrer"`
- ไม่ต้องมี contact form

### 5.8 Footer

- แสดงชื่อเจ้าของ Portfolio
- แสดงปีปัจจุบันโดยคำนวณจากระบบ ไม่ hard-code
- มีลิงก์กลับไปด้านบนของหน้า

## 6. Architecture Requirements

### 6.1 Recommended Structure

```text
app/
├── app.vue
├── assets/css/
│   └── main.css
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   ├── sections/
│   │   ├── HomeSection.vue
│   │   ├── AboutSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── ProjectsSection.vue
│   │   └── ContactSection.vue
│   └── ui/
│       ├── SectionHeading.vue
│       ├── SkillGroup.vue
│       ├── ExperienceItem.vue
│       └── ProjectCard.vue
├── composables/
│   └── useProfile.ts
├── pages/
│   └── index.vue
├── types/
│   └── profile.ts
└── utils/
    └── contactLinks.ts
data/
└── profile.json
nuxt.config.ts
```

โครงสร้างจริงปรับได้หากยังคงหลักการต่อไปนี้

- `pages/index.vue` ทำหน้าที่ compose sections ไม่เก็บ markup รายละเอียดทั้งหมด
- Section component รับข้อมูลผ่าน typed props หรือ composable
- Repeated UI ใช้ reusable component และ render ด้วย `v-for`
- Business/data transformation เช่นการแปลง handle เป็น URL อยู่ใน composable หรือ utility
- Component ไม่อ่าน JSON ซ้ำโดยตรงหลายแห่ง
- หลีกเลี่ยง global state library เพราะข้อมูลเป็น static และไม่มี shared mutable state
- หลีกเลี่ยง abstraction ที่มีผู้ใช้เพียงจุดเดียวและไม่ช่วยให้โค้ดชัดขึ้น

### 6.2 Type Safety and Code Quality

- ห้ามใช้ `any` โดยไม่มีเหตุผลที่ระบุไว้
- Props และค่าที่ composable คืนมาต้องมี type ชัดเจน
- แต่ละ list ต้องมี stable และ unique `key`
- ไม่มี TypeScript, Vue หรือ Nuxt build error
- ไม่มี error ใน browser console ระหว่างการใช้งานปกติ
- ชื่อ component, type และ function ต้องสื่อความหมายและใช้รูปแบบเดียวกันทั้งโครงการ

## 7. Responsive and Accessibility Requirements

- รองรับ viewport ขั้นต่ำตั้งแต่ 320px ขึ้นไป
- Layout ต้องเหมาะกับ mobile, tablet และ desktop โดยใช้ content-driven breakpoints เท่าที่จำเป็น
- ไม่มี horizontal scroll ที่เกิดจาก layout ใน viewport ปกติ
- ใช้ semantic HTML ได้แก่ `header`, `nav`, `main`, `section`, `article`, `footer` และ heading ตามลำดับ
- ทุก section ต้องมี heading และ `id` ที่ unique
- การทำงานหลักทั้งหมดต้องใช้งานผ่าน keyboard ได้
- มี visible focus state สำหรับ link และ button
- สีข้อความและพื้นหลังต้องมี contrast ที่อ่านได้ตาม WCAG AA เป็นเป้าหมาย
- เคารพ `prefers-reduced-motion` หากมี smooth scroll หรือ transition
- ลิงก์ต้องมี accessible name ที่บอกปลายทางได้ชัดเจน
- รูปภาพตกแต่งต้องมี `alt=""`; รูปภาพที่ให้ข้อมูลต้องมี alt text ที่เหมาะสม

## 8. SEO Requirements

- ใช้ Nuxt SSR หรือ prerender เพื่อให้เนื้อหาหลักอยู่ใน HTML ที่ crawler อ่านได้
- กำหนด page title ที่มีชื่อและตำแหน่ง เช่น `Wanthanee Pansrisuk | Backend Developer`
- กำหนด meta description จาก summary โดยมีความยาวเหมาะสม
- กำหนด `html lang` ให้ตรงกับภาษาหลักของหน้า
- มี canonical URL ผ่าน runtime config หรือ site configuration โดยไม่ hard-code domain สมมติ
- เพิ่ม Open Graph ขั้นพื้นฐาน: `og:title`, `og:description`, `og:type`, `og:url`
- เพิ่ม Twitter Card ขั้นพื้นฐาน
- มี heading `h1` หลักเพียงหนึ่งรายการ และลำดับ heading ไม่ข้ามโดยไม่มีเหตุผล
- เพิ่ม structured data ชนิด `Person` แบบ JSON-LD โดยใช้ข้อมูล profile และ contact ที่มีจริง
- สร้าง `robots.txt` และ `sitemap.xml` เมื่อมี production base URL; หากยังไม่มี domain ให้เตรียม configuration โดยไม่ใส่ URL ปลอม
- Link ภายในใช้ anchor ที่สื่อความหมาย และ external link ใช้ URL ที่ถูกต้อง

## 9. UI Guidelines

- ใช้ visual style แบบเรียบง่าย เน้น typography, spacing และลำดับข้อมูล
- ใช้สีหลักและสี accent จำนวนจำกัด
- ใช้ design tokens ผ่าน CSS custom properties สำหรับสี spacing ขนาด container และ border radius ที่ใช้ซ้ำ
- จำกัดความกว้างเนื้อหาเพื่อให้อ่านง่ายบน desktop
- Project และ Skill ใช้ grid ที่ลดจำนวน column ตามพื้นที่หน้าจอ
- ไม่ต้องใช้ UI framework หรือ icon library หาก native HTML/CSS เพียงพอ
- ไม่ใช้ carousel, parallax, animation หนัก หรือองค์ประกอบที่เพิ่ม complexity โดยไม่จำเป็น

## 10. Performance and Security

- ไม่เพิ่ม dependency ที่ไม่จำเป็น
- ไม่โหลด font, script หรือ asset จากภายนอกหากไม่มีความจำเป็น
- หากเพิ่มรูปภาพภายหลัง ให้ระบุขนาดและใช้ format ที่เหมาะสม
- หน้าแรกควรไม่มี client-side data fetch สำหรับข้อมูล static ใน `profile.json`
- ไม่มี secret, token หรือข้อมูล credential ใน client bundle หรือ repository
- ข้อมูลที่นำมา render ต้องใช้ Vue interpolation ตามปกติและไม่ใช้ `v-html` กับ content จาก JSON
- Production build ต้องสำเร็จ

## 11. Testing and Verification

ขั้นต่ำต้องตรวจสอบดังนี้

- Type check ผ่าน
- Production build ผ่าน
- Navigation link ทุกตัวพาไปยัง section ที่ถูกต้อง
- Section ทั้ง 6 แสดงผลครบ
- Skills, Experience และ Projects แสดงจำนวนตรงกับ `data/profile.json`
- Empty GitHub/Demo URL ไม่สร้าง link ว่าง
- Contact links สร้าง URL และ attributes ถูกต้อง
- ตรวจ layout ที่ viewport อย่างน้อย 320px, 768px และ 1280px
- ตรวจ keyboard navigation และ focus state
- ตรวจว่าไม่มี horizontal overflow และไม่มี browser console error
- ตรวจ title, meta description, Open Graph และ JSON-LD จาก rendered HTML

หากเพิ่ม automated tests ให้เน้น logic ที่มีความเสี่ยงก่อน ได้แก่ data mapping, contact URL transformation และ conditional project links ไม่จำเป็นต้องทำ snapshot test ทุก component

## 12. Acceptance Criteria / Definition of Done

งานถือว่าเสร็จเมื่อเงื่อนไขทั้งหมดต่อไปนี้ผ่าน

1. เปิด `/` แล้วเห็น Home, About, Skills, Experience, Projects และ Contact ครบ
2. เนื้อหาทั้งหมดมาจาก `data/profile.json` และไม่มีข้อมูล profile ชุดซ้ำใน component
3. Navigation ใช้งานได้ด้วย mouse, touch และ keyboard รวมถึงเปิด section ผ่าน hash URL ได้
4. แสดง Skills ทุกหมวด, Experience ทุกรายการ และ Projects ทั้ง 12 รายการโดยไม่มี runtime error
5. Project link ที่ไม่มีข้อมูลถูกซ่อน และ external link ที่มีข้อมูลปลอดภัยตาม requirement
6. หน้าเว็บใช้งานได้ที่ความกว้าง 320px, 768px และ 1280px โดยไม่มี horizontal overflow
7. Semantic structure, heading hierarchy, focus state และ link labels ผ่านการตรวจเบื้องต้น
8. Page title, meta description, Open Graph, canonical configuration และ Person JSON-LD ถูกสร้างจากข้อมูลจริง
9. Type check และ production build ผ่านโดยไม่มี error
10. โครงสร้าง component แยก section และ repeated UI ชัดเจน สามารถเพิ่ม Skill หรือ Project ผ่าน JSON ได้โดยไม่เปลี่ยนโครงสร้างหน้า

## 13. Suggested Implementation Order for AI-assisted Development

1. Scaffold Nuxt 4 และตั้งค่า TypeScript/CSS
2. สร้าง types และ data composable จาก `profile.json`
3. สร้าง page shell, header, navigation และ footer
4. สร้าง section components ทีละส่วน
5. แยก repeated UI เป็น SkillGroup, ExperienceItem และ ProjectCard
6. เพิ่ม responsive styles และ accessibility states
7. เพิ่ม SEO metadata และ structured data
8. รัน type check/build และตรวจ acceptance criteria

ในแต่ละขั้นควรให้ AI เปลี่ยนแปลงเป็นชุดเล็กที่ review ได้ ระบุไฟล์และ acceptance criteria ใน prompt และตรวจ diff รวมถึงผลการทดสอบก่อนเริ่มขั้นถัดไป
