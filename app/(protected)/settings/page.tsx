import { auth } from '@/auth'

const SettingPage = async () => {
  const session = await auth()
  return <div>{JSON.stringify(session)}</div>
}

export default SettingPage
