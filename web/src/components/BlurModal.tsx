import { isEnvBrowser } from '../lib/utils'

interface Props {
  onClose: () => void
}

export default function BlurModal ({ onClose }: Props) {
  const handleOutsideClick = (e: any) => {

    if (e.target === e.currentTarget && !isEnvBrowser()) {
      onClose()
    }
  }

  return (
    <div
      className="inset-0 w-screen h-screen fixed"
      onClick={handleOutsideClick}
    >
    </div>
  )
}