import { SetPageTheme, ButtonRippleEffect, PageScroll, ArticleNavigation } from "./modules/projectMetods.js";
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
var macy = Macy({
    container: '.photos-container',
    trueOrder: false,
    waitForImages: false,
    margin: 15,
    columns: 2,
    breakAt: {
        500: 1
    }
});isWebp();

class InitPage {
    constructor() {
        this.ripple = new ButtonRippleEffect();
        this.setpageTheme = new SetPageTheme();
        this.pageScroll = new PageScroll();
        this.nav = new ArticleNavigation();
    }

    init() {
        this.ripple.rippleEvent();
        this.setpageTheme.themeSelectEvent();
        this.pageScroll.headerScrollEvent();
        this.nav.articleDocInit();
        
    }
}

let init = new InitPage();
init.init();