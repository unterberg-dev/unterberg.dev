import { useCallback, useState } from 'react'

import Icon from '#atoms/Icon'
import Layout from '#atoms/Layout'
import Link from '#atoms/Link'
import { APP_CONFIG } from '#lib/constants'
import { externalNavigation } from '#lib/navigation'
import useHamburgerAnimations from '#organisms/Hamburger/useHamburgerAnimations'
import MainNavigation from '#organisms/MainNavigation'
import { R } from '#pixi/utils'

const Hamburger = () => {
  const {
    isExpanded,
    handleExpand,
    handleCollapse,
    expandTimeline,
    collapseOnMenuChangeTimeline,
    hamburgerRef,
    burgerButtonRef,
    layoutRef,
    hoverTimeline,
    handleHoverIn,
    handleHoverLeave,
  } = useHamburgerAnimations()

  const handleClick = useCallback(
    (overlayClick?: boolean) => {
      if (expandTimeline.current?.isActive()) return

      if (isExpanded) {
        handleCollapse()
        if (overlayClick) {
          hoverTimeline.current?.progress(1)
          hoverTimeline.current?.reverse()
        }
      } else {
        handleExpand()
      }
    },
    [expandTimeline, isExpanded, handleCollapse, hoverTimeline, handleExpand],
  )

  const handleMenuItemClick = useCallback(() => {
    if (expandTimeline.current?.isActive()) return
    if (collapseOnMenuChangeTimeline.current?.isActive()) return

    hoverTimeline.current?.progress(1)
    hoverTimeline.current?.reverse()

    expandTimeline.current?.pause()
    collapseOnMenuChangeTimeline.current?.restart()
  }, [collapseOnMenuChangeTimeline, expandTimeline, hoverTimeline])

  return (
    <div ref={hamburgerRef} id="hamburger">
      <div className="fixed z-30 w-full left-0 top-0">
        <Layout className="relative" ref={layoutRef}>
          <div className="burger-button overflow-hidden pixi-hitbox border-1 border-darkLightBorder h-15 w-15 rounded-10 bg-dark bg-opacity-80 absolute right-0 top-3">
            <button
              aria-label="Open navigation menu"
              type="button"
              onClick={() => handleClick()}
              onPointerEnter={handleHoverIn}
              onPointerLeave={handleHoverLeave}
              className="h-15 w-15 top-0 right-0 absolute"
              ref={burgerButtonRef}
            />
            <div className="absolute top-6.5 right-3 w-8 h-8 pointer-events-none">
              <div className="h-1 w-8 relative">
                <div className="top absolute h-1 w-8 left-0 -top-2.5 bg-light" />
                <div className="mid absolute h-1 w-8 left-0 top-0 bg-light" />
                <div className="bot absolute h-1 w-8 left-0 top-2.5 bg-light" />
              </div>
            </div>
            <MainNavigation
              className="inline-flex md:gap-3 gap-5 h-full relative items-center ml-5"
              liProps={{
                className: 'burger-nav-item relative left-25 opacity-0 text-xl hidden',
                onClick: handleMenuItemClick,
              }}
              ulProps={{ className: 'gap-6' }}
            />
            <div className="absolute burger-side-nav top-0 right-30 h-15 w-15 flex gap-4 items-center">
              {externalNavigation.map(item => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="relative text-xl text-grayLight hover:text-warning"
                >
                  <Icon icon={item.icon} className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
        </Layout>
      </div>
      <div className="overlay-wrap fixed inset-0 z-20 hidden">
        <div
          onClick={() => handleClick(true)}
          className="overlay fixed inset-0 bg-grayDark bg-opacity-60 opacity-0"
          style={{ backgroundImage: `url(${APP_CONFIG.viteMediaUrl}/pattern-big.svg)` }}
        >
          <div className="absolute h-80 w-full left-0 top-0 bg-gradient-to-b from-darkLight opacity-80" />
          <div className="absolute h-80 w-full bottom-0 left-0 bg-gradient-to-t from-black opacity-30" />
        </div>
      </div>
    </div>
  )
}

export default Hamburger
