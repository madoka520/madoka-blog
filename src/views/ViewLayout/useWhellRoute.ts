import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { routerChildren } from '@/router'

gsap.registerPlugin(Observer)

export const useWheelRoute = () => {
  const route = useRoute()
  const router = useRouter()

  const changeRoute = (direction: 'up' | 'down') => {
    const currentIndex = routerChildren.findIndex(
      (item) => item.path === route.path,
    )

    // 下一页
    if (direction === 'down') {
      const nextPath = routerChildren[currentIndex + 1]

      if (!nextPath) {
        return
      }

      router.push(nextPath.path)

      return
    }

    // 上一页
    const prevPath = routerChildren[currentIndex - 1]

    if (!prevPath) {
      return
    }

    router.push(prevPath.path)
  }

  const unlock = () => {
    s.lock = false
  }

  const lock = () => {
    s.lock = true

    gsap.delayedCall(1.2, unlock)
  }

  const handleUp = () => {
    if (s.lock) {
      return
    }

    lock()

    changeRoute('up')
  }

  const handleDown = () => {
    if (s.lock) {
      return
    }

    lock()

    changeRoute('down')
  }

  const createObserver = () => {
    s.observer = Observer.create({
      target: window,

      type: 'wheel,touch',

      wheelSpeed: 1,

      tolerance: 10,

      preventDefault: true,

      onUp: handleUp,

      onDown: handleDown,
    })
  }

  const destroyObserver = () => {
    s.observer?.kill()
  }

  const s = reactive({
    lock: false,
    observer: null as any,
    unlock,
    handleUp,
    handleDown,

    createObserver,
    destroyObserver,
  })

  onMounted(() => {
    s.createObserver()
  })

  onUnmounted(() => {
    s.destroyObserver()
  })
}
