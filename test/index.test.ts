import * as auto from "miniprogram-automator"
import MiniProgram from "miniprogram-automator/out/MiniProgram"
import Page from "miniprogram-automator/out/Page"

describe('index', () => {

  let mini: MiniProgram = null
  let page: Page = null

  beforeAll(async () => {
    mini = await auto.launch({
      projectPath: "/Users/cairui/WeChatProjects/ladisuart",
      // account:"onk2C4gnOAmGbc3UrjmPAeSAC368"
    })

    page = await mini.reLaunch('/pages/login/login')
    await page.waitFor(500)
  }, 30000)


  afterAll(async () => {
    await mini.close()
  })

  it('测试avanter布局', async () => {
    const avanter = await page.$(".avanter")
    const img = await (await avanter.$("van-image")).$("image")
    expect(await img.attribute('src')).toBe('https://www.ladishb.com/upload/5y2wYWklE0usgYG0VwLTdRnc.png')
    const text = await avanter.$("text")
    expect(await text.text()).toBe("")
    await mini.screenshot({ path: './test/avanter.jpg' })
  }, 30000)

/*   it('测试登录', async () => {
    await page.setData({
      accontUser: 'test2',
      accontPasswd: '123456'
    })

    console.log(await page.data());
    
    const loginBtn = await page.$(".login")
    await loginBtn.tap()
    await page.waitFor(1000)
    const path =  (await mini.currentPage()).path
    console.log({path});
    
    expect(path).toBe('pages/index/index')
  })
 */
})
