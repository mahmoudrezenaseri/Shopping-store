import React from 'react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'داشبورد',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'رسانه',
    route: '/media',
    icon: <CIcon content={freeSet.cilImage} customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'افزودن',
        to: '/media/add',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'کتابخانه',
        to: '/media/all',
      },
    ],
  }
]

export default _nav
