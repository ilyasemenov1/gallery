import { SetPageTheme, ButtonRippleEffect, PageScroll, ArticleNavigation, AddImagesButtons } from "./modules/projectMetods.js";
import { isWebp } from "./modules/isWebpSupport.js";

import Macy from 'macy';
import LazyLoad from "vanilla-lazyload";

const lazyLoadInstance = new LazyLoad({
    callback_error: (img) => {
        img.setAttribute("src", "img/fallback.webp");
        let parent = img.parentElement;
        [...parent.children].forEach(element => {
            let tag = element.tagName;
            tag === "SOURCE" ? element.remove() : void(0)
        });
      }
});
lazyLoadInstance.update();
let photoContainers = document.querySelectorAll(".photos-container");
photoContainers.forEach(element => {
    var macy = Macy({
        container: element,
        trueOrder: false,
        waitForImages: false,
        margin: 15,
        columns: 2,
        breakAt: {
            500: 1
        }
    });
    window.addEventListener("load", () => {
        setTimeout(() => {
            macy.recalculate(true);
        }, 50);
    });
})


isWebp();

class InitPage {
    constructor() {
        this.ripple = new ButtonRippleEffect();
        this.setpageTheme = new SetPageTheme();
        this.pageScroll = new PageScroll();
        this.nav = new ArticleNavigation();
        this.imgButtons = new AddImagesButtons();
    }

    init() {
        this.ripple.rippleEvent();
        this.setpageTheme.themeSelectEvent();
        this.pageScroll.headerScrollEvent();
        this.nav.articleDocInit();
        this.imgButtons.generatePhotoMenu();
    }
}

let init = new InitPage();
init.init();