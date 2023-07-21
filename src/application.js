// @ts-check

// BEGIN (write your solution here) (write your solution here)

class View {
  formEl;

  listEl;

  resultEl;

  init(laptopModels) {
    this.formEl = document.querySelector('form');
    this.resultEl = document.querySelector('.result');
    this.listEl = document.createElement('ul');
    this.render(laptopModels);
  }

  render(laptopModels) {
    if (laptopModels.length === 0) {
      this.listEl.remove();
      return;
    }

    this.listEl.innerHTML = '';

    laptopModels.forEach((laptopModel) => {
      const itemEl = document.createElement('li');
      itemEl.textContent = laptopModel;
      this.listEl.append(itemEl);
    });

    this.resultEl.replaceChildren(this.listEl);
  }
}

const inputsConfig = {
  processor_eq: 'change',
  memory_eq: 'change',
  frequency_lte: 'input',
  frequency_gte: 'input',
};

function filterLaptopList(laptops, filters) {
  const shouldBeSelected = (laptop) =>
    Object.keys(filters).every((key) => {
      const value = filters[key];

      if (!value) return true;

      switch (key) {
        case 'processor_eq':
          return laptop.processor === value;
        case 'memory_eq':
          return laptop.memory === Number(value);
        case 'frequency_gte':
          return laptop.frequency >= Number(value);
        case 'frequency_lte':
          return laptop.frequency <= Number(value);
        default:
          return false;
      }
    });

  return laptops.filter(shouldBeSelected).map((laptop) => laptop.model);
}

export default function filter(laptops) {
  const state = {
    formState: {
      filters: {
        processor_eq: null,
        memory_eq: null,
        frequency_gte: null,
        frequency_lte: null,
      },
    },
    laptopListState: {
      selectedLaptopModels: laptops.map((laptop) => laptop.model),
    },
  };

  view.init(state.laptopListState.selectedLaptopModels);

  function handleFormChange(e) {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    
    state.formState.filters[inputName] = inputValue ? inputValue : null;
    
    state.laptopListState.selectedLaptopModels = filterLaptopList(
      laptops,
      state.formState.filters
    );

    view.render(state.laptopListState.selectedLaptopModels);
  }
  
  Object.entries(inputsConfig).forEach(([elementName, eventName]) => {
    const element = document.querySelector(`[name="${elementName}"]`);
    
    element.addEventListener(eventName, handleFormChange);
  });
  
}

const view = new View();
// END
