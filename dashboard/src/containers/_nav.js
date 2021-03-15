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
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['فروشگاه']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'دسته بندی',
    to: '/category',
    icon: <CIcon content={freeSet.cilApps} customClasses="c-sidebar-nav-icon" />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'محصولات',
    to: '/product',
    icon: <CIcon content={freeSet.cil3d} customClasses="c-sidebar-nav-icon" />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'نظرات',
    to: '/comment',
    icon: <CIcon content={freeSet.cilCommentBubble} customClasses="c-sidebar-nav-icon" />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'مشتریان',
    to: '/customer',
    icon: <CIcon content={freeSet.cilGroup} customClasses="c-sidebar-nav-icon" />
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['تنظیمات']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'تنظیمات',
    to: '/setting',
    icon: <CIcon content={freeSet.cilSettings} customClasses="c-sidebar-nav-icon" />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'کاربران',
    to: '/user',
    icon: <CIcon content={freeSet.cilUser} customClasses="c-sidebar-nav-icon" />
  }
]

export default _nav
