const curr = (($) => {
  const curren = () => {
    let currencies = [];
    let flag = true;

    const $button = $('.exchange');
    const $sellInput = $('.sell-input');
    const $sellSelect = $('.sell-select');
    const $buyInput = $('.buy-input');
    const $buySelect = $('.buy-select');
    const url = 'https://openexchangerates.org/api/latest.json?app_id=8e657397e80f499ba6bd74a8155fcf74';

    const renderSelect = (resp) => {
      $.each(resp.rates, (k) => {
        $sellSelect.append(`<option value=${k}>${k}</option>`);
        $buySelect.append(`<option value=${k}>${k}</option>`);
      });
    };

    const getCurrencies = () => {
      $.ajax({
        url,
        type: 'GET',
        error() {
          return true;
        },
        success(data) {
          currencies = data;
          if (flag) {
            renderSelect(currencies);
            flag = false;
          }
        },
      });
    };

    getCurrencies();

    $button.on('click', (e) => {
      e.preventDefault();
      getCurrencies();
      const buyOption = $buySelect[0].value;
      const sellOption = $sellSelect[0].value;
      const sellVal = $sellInput[0].value;
      let sellCourse;
      let buyCourse;
      $.each(currencies.rates, (k, v) => {
        if (k === sellOption) {
          sellCourse = v;
        }
        if (k === buyOption) {
          buyCourse = v;
        }
      });
      $buyInput[0].value = (sellVal / sellCourse) * buyCourse;
    });
  };

  const init = () => {
    curren();
  };

  return {
    init,
  };
})(jQuery);
export default curr;
