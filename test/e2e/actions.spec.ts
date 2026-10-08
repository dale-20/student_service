import { expect, test, type Page } from '@playwright/test'

async function visit(page: Page, path: string) {
  await page.goto(path)
  await page.waitForFunction(() => (document.querySelector('#__nuxt') as HTMLElement & { __vue_app__?: { $nuxt?: { isHydrating: boolean } } })?.__vue_app__?.$nuxt?.isHydrating === false)
}

test('small records use icon actions and old detail links open Edit', async ({ page }) => {
  await visit(page, '/login')
  await page.getByLabel(/email address/i).fill('admin@example.com')
  await page.getByLabel(/^Password/).fill('password')
  await page.getByRole('button', { name: 'Sign in', exact: true }).click()
  await expect(page).toHaveURL(/\/dashboard$/)

  for (const resource of ['courses', 'academic-terms', 'course-offerings']) {
    await visit(page, '/' + resource)
    const edit = page.getByRole('link', { name: /^Edit / }).first()
    await expect(edit).toBeVisible()
    await expect(page.getByRole('link', { name: /^View / })).toHaveCount(0)
    const editPath = await edit.getAttribute('href')
    expect(editPath).toMatch(new RegExp('^/' + resource + '/\\d+/edit$'))

    if (resource === 'courses') {
      await page.setViewportSize({ width: 1440, height: 1000 })
      await page.screenshot({ path: '.impeccable/review/actions-desktop.png', fullPage: true, animations: 'disabled' })
      await page.setViewportSize({ width: 390, height: 844 })
      await edit.scrollIntoViewIfNeeded()
      await page.screenshot({ path: '.impeccable/review/actions-mobile.png', fullPage: true, animations: 'disabled' })
    }

    await visit(page, editPath!.replace(/\/edit$/, ''))
    await expect(page).toHaveURL(new RegExp('/' + resource + '/\\d+/edit$'))
    await page.getByRole('link', { name: 'Cancel', exact: true }).click()
    await expect(page).toHaveURL(new RegExp('/' + resource + '$'))
  }

  await visit(page, '/courses')
  await page.getByRole('link', { name: /^Edit / }).first().click()
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(page).toHaveURL(/\/courses$/)

  await visit(page, '/users')
  await expect(page.getByRole('link', { name: /^View / })).toHaveCount(0)
  await expect(page.getByRole('link', { name: /^Edit / }).first()).toHaveAttribute('href', /\/users\/\d+$/)
})
