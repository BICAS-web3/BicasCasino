import { EffectorNext } from '@effector/next'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <EffectorNext>{children}</EffectorNext>
}

export default StoreProvider
