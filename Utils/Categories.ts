import { MdStorefront } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa6";
import { MdTv } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { IoMdLaptop } from "react-icons/io";
import { AiFillPhone } from "react-icons/ai";
import { FiWatch } from "react-icons/fi";

export const categories=[
    {
        label:'All',
        icon:MdStorefront
    },
    {
        label:'Phone',
        icon:AiFillPhone
    },
    {
        label:'Laptop',
        icon:IoMdLaptop
    },
    {
        label:'Desktop',
        icon:FaDesktop
    },
    {
        label:'Watch',
        icon:FiWatch
    },

    
    {
        label:'Tv',
        icon:MdTv
    },
    {
        label:'Accesories',
        icon:FaKeyboard
    },
]