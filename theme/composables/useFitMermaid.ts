import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted } from 'vue'

function fitSvg(svg: SVGElement | null | undefined) {
  if (!svg)
    return
  svg.removeAttribute('height')
  svg.style.width = '100%'
  svg.style.height = '100%'
  svg.style.maxWidth = '100%'
}

/**
 * Scales Mermaid diagrams inside `root` to fill their box. Mermaid renders into a
 * shadow root, which CSS cannot reach, so the SVG is resized from script.
 */
export function useFitMermaid(root: Ref<HTMLElement | undefined>) {
  const observers: MutationObserver[] = []
  const seen = new WeakSet<ShadowRoot>()
  let timer: ReturnType<typeof setInterval> | undefined

  function scan() {
    root.value?.querySelectorAll<HTMLElement>('.mermaid').forEach((host) => {
      const shadow = host.shadowRoot
      if (!shadow)
        return
      fitSvg(shadow.querySelector('svg'))
      if (!seen.has(shadow)) {
        seen.add(shadow)
        const mo = new MutationObserver(() => fitSvg(shadow.querySelector('svg')))
        mo.observe(shadow, { childList: true })
        observers.push(mo)
      }
    })
  }

  onMounted(() => {
    if (!root.value)
      return
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(root.value, { childList: true, subtree: true })
    observers.push(mo)
    // shadow roots are attached asynchronously
    let tries = 0
    timer = setInterval(() => {
      scan()
      if (++tries > 20)
        clearInterval(timer)
    }, 150)
  })

  onBeforeUnmount(() => {
    clearInterval(timer)
    observers.forEach(o => o.disconnect())
  })
}
