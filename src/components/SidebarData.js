import React from 'react'
import * as MdIcons from 'react-icons/md' // Material Design Icons
import * as GiIcons from 'react-icons/gi'
import * as DiIcons from 'react-icons/di'

export const SidebarData = [
    {
        title: 'HOME',
        path: '/',
        icon: <MdIcons.MdHomeFilled size={35} />,
        cName: 'nav-text'
    },
    {
        title: 'BOOKS',
        path: '/books',
        icon: <GiIcons.GiBookmarklet size={35} />,
        cName: 'nav-text'
    },
    {
        title: 'AUTHORS',
        path: '/authors',
        icon: <DiIcons.DiYeoman size={35} />,
        cName: 'nav-text'
    },
    {
        title: 'ASSIGNMENTS',
        path: '/assignments',
        icon: <MdIcons.MdOutlineAssignmentInd size={35} />,
        cName: 'nav-text'
    },
]