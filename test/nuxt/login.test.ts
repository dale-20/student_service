import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import LoginForm from '../../app/components/auth/LoginForm.vue'

const mocks = vi.hoisted(() => ({ login: vi.fn(), navigate: vi.fn() }))
mockNuxtImport('useAuth', () => () => ({ login: mocks.login }))
mockNuxtImport('navigateTo', () => mocks.navigate)

beforeEach(() => { vi.resetAllMocks() })

describe('school portal sign in', () => {
  it('welcomes users to StudentServe', async () => {
    const wrapper = await mountSuspended(LoginForm)
    expect(wrapper.get('h1').text()).toBe('Sign in to StudentServe')
    wrapper.unmount()
  })

  it('lets users reveal and hide their password without losing its value', async () => {
    const wrapper = await mountSuspended(LoginForm)
    await wrapper.get('#password').setValue('my-password')
    expect(wrapper.get('#password').attributes('type')).toBe('password')
    await wrapper.get('[aria-label="Show password"]').trigger('click')
    expect(wrapper.get('#password').attributes('type')).toBe('text')
    expect(wrapper.get<HTMLInputElement>('#password').element.value).toBe('my-password')
    await wrapper.get('[aria-label="Hide password"]').trigger('click')
    expect(wrapper.get('#password').attributes('type')).toBe('password')
    expect(mocks.login).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it.each([false, true])('preserves the correct destination when password change is %s', async (mustChange) => {
    mocks.login.mockResolvedValue({ must_change_password: mustChange })
    const wrapper = await mountSuspended(LoginForm)
    await wrapper.get('#email').setValue('student@school.edu')
    await wrapper.get('#password').setValue('my-password')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(mocks.login).toHaveBeenCalledExactlyOnceWith('student@school.edu', 'my-password')
    expect(mocks.navigate).toHaveBeenCalledWith(mustChange ? '/change-password' : '/dashboard')
    wrapper.unmount()
  })

  it('prevents duplicate submissions and shows progress while signing in', async () => {
    let finish: ((value: { must_change_password: boolean }) => void) | undefined
    mocks.login.mockImplementation(() => new Promise(resolve => { finish = resolve }))
    const wrapper = await mountSuspended(LoginForm)
    await wrapper.get('form').trigger('submit')
    await wrapper.get('form').trigger('submit')
    expect(mocks.login).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('form').attributes('aria-busy')).toBe('true')
    expect(wrapper.text()).toContain('Signing in')
    finish?.({ must_change_password: false })
    await flushPromises()
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeUndefined()
    wrapper.unmount()
  })

  it('associates Laravel validation errors with each field and clears them on retry', async () => {
    mocks.login.mockRejectedValueOnce({ status: 422, message: 'Please check your account details.', errors: { email: ['This school account was not found.'], password: ['The password is required.'] } })
    const wrapper = await mountSuspended(LoginForm)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('[role="alert"]').text()).toBe('Please check your account details.')
    expect(wrapper.get('#email').attributes('aria-describedby')).toBe('email-error')
    expect(wrapper.get('#email-error').text()).toContain('not found')
    expect(wrapper.get('#password').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('#password-error').text()).toContain('required')
    mocks.login.mockResolvedValueOnce({ must_change_password: false })
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.get('#password').attributes('aria-invalid')).toBe('false')
    wrapper.unmount()
  })

  it('reports a failed sign in and keeps the form available for another attempt', async () => {
    mocks.login.mockRejectedValue({ status: 401, message: 'These credentials do not match our records.' })
    const wrapper = await mountSuspended(LoginForm)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('[role="alert"]').text()).toContain('credentials')
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeUndefined()
    expect(mocks.navigate).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
