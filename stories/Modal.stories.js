import React, { useState } from "react";
import { Modal } from "../components/Modal";

export default {
    title: "Example/modal",
    component: Modal,
    args: {
        title: "Confirm Modal",
        body: "Do you want to proceed?",
        withCloseBtn: false,
        hasBgLayer: false,
    }
}

export const Default = () => { }

export const hasBgLayer = {
    args: {
        hasBgLayer: true
    }
}

export const withCloseBtn = {
    args: {
        withCloseBtn: true,
        hasBgLayer: true
    }
}

export const customizedModal = {
    args: {
        canCustomize: true,
        customStyles: {
            background: "bg-[#ccccff]",
            modalBg: "bg-[#b3b3ff]",
            noBtn: {
                bg: "bg-[#6666ff]",
                hover: `hover:bg-[#9999ff]`,
            },
            yesBtn: {
                bg: "bg-white",
                hover: `hover:bg-[#9999ff]`,
                color:"text-black"
            },

        },
    }
}