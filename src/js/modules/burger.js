const BurgerModule = {
    init: function () {
        let header = $("#header");

        let mobileData = {
            burger: $(".header__burger__icon"),
            menu: $(".header__burger__menu"),
            close: $(".header__burger__menu__close"),
            show: function () {
                header.addClass('active');
                setTimeout(() => {
                    header.addClass('active-show');
                }, 100)
            },
            hide: function () {
                header.removeClass('active-show');
                setTimeout(() => {
                    header.removeClass('active');
                }, 100)
            },
        }

        mobileData.burger.click(function () {
            header.hasClass('active') ? mobileData.hide() : mobileData.show()
        });

        $(document).on("click", function (event) {
            let checkIfBurger = mobileData.burger.is(event.target) || Boolean(mobileData.burger.find($(event.target)).length);
            let checkMenu = mobileData.menu.is(event.target) || Boolean(mobileData.menu.find($(event.target)).length);
            if (!checkIfBurger && !checkMenu) {
                mobileData.hide()
            }
        });
    },
}


export default BurgerModule