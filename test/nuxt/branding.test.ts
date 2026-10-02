import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppBrand from '../../app/components/app/AppBrand.vue'
import AppLogo from '../../app/components/app/AppLogo.vue'
import SchoolPortal from '../../app/layouts/school-portal.vue'

describe('StudentServe branding', () => {
  it('identifies the portal with the new name and a decorative crest', async () => {
    const wrapper = await mountSuspended(AppBrand)
    expect(wrapper.get('strong').text()).toBe('StudentServe')
    expect(wrapper.get('small').text()).toBe('Student Information System')
    expect(wrapper.get('img').attributes('src')).toBe('/brand/studentserve-crest.svg')
    expect(wrapper.get('img').attributes('alt')).toBe('')
    wrapper.unmount()
  })

  it('keeps the compact brand linked to the dashboard with an accessible name', async () => {
    const wrapper = await mountSuspended(AppLogo)
    expect(wrapper.get('a').attributes('href')).toBe('/dashboard')
    expect(wrapper.get('a').attributes('aria-label')).toBe('StudentServe dashboard')
    expect(wrapper.text()).toContain('StudentServe')
    expect(wrapper.text()).toContain('Academic services')
    wrapper.unmount()
  })

  it('uses the same identity in the public header and footer', async () => {
    const wrapper = await mountSuspended(SchoolPortal, { slots: { default: '<p>Sign-in form</p>' } })
    expect(wrapper.get('header').text()).toContain('StudentServe')
    expect(wrapper.get('footer').text()).toContain('StudentServe')
    expect(wrapper.text()).not.toContain('StudentIS')
    expect(wrapper.get('#sign-in').text()).toContain('Sign-in form')
    wrapper.unmount()
  })
})
