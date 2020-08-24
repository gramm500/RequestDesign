import './style/scss/main.scss';
import * as Project from "./js";

jQuery(document).ready(function () {
    Project.SwiperModule.init();
    Project.NiceSelect.init();
    Project.BurgerModule.init();
    Project.AccordionModule.init();
});
