import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import Block from '../theme/components/Block.vue'
import Caption from '../theme/components/Caption.vue'

const themeConfig: Record<string, unknown> = {}

vi.mock('@slidev/client', () => ({
  useSlideContext: () => ({
    $slidev: {
      configs: { themeConfig },
      nav: {
        slides: [],
        go: () => {},
      },
    },
    $page: ref(1),
    $frontmatter: {},
  }),
  resolveAssetUrl: (url: string) => url,
}))

describe('<Block>', () => {
  it('renders title, type and outline modifiers', () => {
    const wrapper = mount(Block, {
      props: { title: 'Definition', type: 'alert', outline: true },
      slots: { default: 'Body' },
    })
    expect(wrapper.classes()).toEqual(['tum-block', 'tum-block--alert', 'tum-block--outline'])
    expect(wrapper.find('.tum-block__title').text()).toBe('Definition')
    expect(wrapper.find('.tum-block__body').text()).toBe('Body')
  })

  it('omits the title bar without a title', () => {
    const wrapper = mount(Block, {
      slots: { default: 'Body' },
    })
    expect(wrapper.classes()).toContain('tum-block--info')
    expect(wrapper.find('.tum-block__title').exists()).toBe(false)
  })
})

describe('<Caption>', () => {
  it('numbers figures in the deck language', () => {
    themeConfig.lang = 'de'
    const wrapper = mount(Caption, {
      props: { n: 2 },
      slots: { default: 'Topologie' },
    })
    expect(wrapper.find('.tum-caption__label').text()).toBe('Abbildung 2:')
    themeConfig.lang = 'en'
  })

  it('uses a custom label', () => {
    const wrapper = mount(Caption, {
      props: { n: 1, label: 'Table' },
      slots: { default: 'Results' },
    })
    expect(wrapper.find('.tum-caption__label').text()).toBe('Table 1:')
  })

  it('has no label without a number', () => {
    const wrapper = mount(Caption, {
      slots: { default: 'Plain' },
    })
    expect(wrapper.find('.tum-caption__label').exists()).toBe(false)
  })
})
