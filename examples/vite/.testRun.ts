import { page, run, urlBase, autoRetry, fetchHtml, fetch } from '../../libframe/test/setup'

export { testRun }

function testRun(
  cmd: 'npm run dev' | 'npm run prod' | 'npm run start' | 'npm run preview',
  { skipShieldGenerationTest }: { skipShieldGenerationTest?: true } = {}
) {
  run(cmd)

  test('example', async () => {
    {
      const html = await fetchHtml('/')
      expect(html).toContain('Loading...')
      expect(html).not.toContain('Eva')
    }
    {
      page.goto(`${urlBase}/`)
      // `autoRetry` to ensure that async JavaScript has loaded & executed
      await autoRetry(async () => {
        expect(await page.textContent('body')).toContain('Welcome Eva')
      })
      expect(await page.textContent('body')).not.toContain('Loading')
    }
  })

  if (!skipShieldGenerationTest) {
    test('shield() generation', async () => {
      {
        const resp = await makeTelefuncHttpRequest('Jon')
        const { ret } = await resp.json()
        expect(resp.status).toBe(200)
        expect(ret.message).toBe('Welcome Jon')
      }
      {
        const resp = await makeTelefuncHttpRequest(1337)
        expect(resp.status).toBe(403)
        expect(await resp.text()).toBe('{"ret":"!undefined","abort":true}')
      }
    })
  }
}

async function makeTelefuncHttpRequest(name: string | number) {
  const resp = await fetch(`${urlBase}/_telefunc`, {
    method: 'POST',
    body: JSON.stringify({
      file: '/hello.telefunc.ts',
      name: 'hello',
      args: [{ name }]
    })
  })
  return resp
}
