<script setup lang="ts">
const { data } = await useActivity()

const grid = computed(() => data.value)
const githubUrl = 'https://github.com/wanthanee-jwp'
const gitlabUrl = 'https://gitlab.com/wanthanee-jwp'

const rangeLabel = computed(() => {
  if (!grid.value) return ''
  return `${grid.value.startDate} to ${grid.value.endDate}`
})
</script>

<template>
  <section id="activity" class="section" aria-labelledby="activity-title">
    <div class="section-heading">
      <span class="section-heading__icon" aria-hidden="true">
        <AppIcon name="activity" />
      </span>
      <h2 id="activity-title">Activity</h2>
      <span v-if="grid && grid.totalCount > 0" class="section-heading__count">
        ({{ grid.totalCount }})
      </span>
    </div>

    <div class="activity-card">
      <div class="activity-heatmap" role="img" :aria-label="`Contribution activity from ${rangeLabel}`">
        <div class="activity-heatmap__months" aria-hidden="true">
          <span
            v-for="m in grid.monthLabels"
            :key="`${m.weekIndex}-${m.label}`"
            :style="{ gridColumnStart: m.weekIndex + 1 }"
          >{{ m.label }}</span>
        </div>
        <div class="activity-heatmap__days" aria-hidden="true">
          <span>M</span>
          <span>W</span>
          <span>F</span>
        </div>
        <div class="activity-heatmap__cells">
          <span
            v-for="cell in grid.weeks.flat()"
            :key="cell.date"
            class="activity-cell"
            :data-level="cell.level"
            :title="`${cell.count} contribution${cell.count === 1 ? '' : 's'} on ${cell.date}`"
          />
        </div>
      </div>

      <div class="activity-card__footer">
        <div class="activity-legend" aria-hidden="true">
          <span class="activity-cell" data-level="0" />
          <span class="activity-cell" data-level="1" />
          <span class="activity-cell" data-level="2" />
          <span class="activity-cell" data-level="3" />
          <span class="activity-cell" data-level="4" />
        </div>
        <p class="activity-card__note">
          Public contributions across
          <a :href="githubUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
          and
          <a :href="gitlabUrl" target="_blank" rel="noopener noreferrer">GitLab</a>.
          Most day-to-day work lives in private repositories.
        </p>
      </div>
    </div>
  </section>
</template>
