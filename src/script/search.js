class Search {
  constructor(form, errorWrapper) {
    this.form = form;
    this.error = errorWrapper;
    this.form.addEventListener('input', () => this.validate());
    this.form.addEventListener('submit', () => this.validate());
  }
  validate() {
    if(this.form.input.value === '') {
      this.error.textContent = 'Нужно ввести ключевое слово';
      this.error.setAttribute('style', 'display: block');
      return false;
    } else
      this.error.setAttribute('style', 'display: none');
    if(!this.form.elements.input.validity.valid) {
      this.error.textContent = 'Длина запроса должна быть от 2 до 31 символа.';
      this.error.setAttribute('style', 'display: block');
      return false;
    } else
      this.error.setAttribute('style', 'display: none');
        return true;
  }
}

export {Search};
