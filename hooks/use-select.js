import { isFunction } from 'lodash';
import { useSelect as useDownshift } from 'downshift';

const useSelect = ({ children, onSelect, defaultSelected }) => {
  const prepareItems = (children = [], onSelect = () => {}) => {
    const items = children.map(({ props: { value, children } }) => ({
      value,
      label: children,
    }));

    return {
      items,
      defaultSelectedItem: items.find((item) => item?.value === defaultSelected) || null,
      itemToString: (item) => item?.label || item,
      onSelectedItemChange: ({ selectedItem = {} }) => {
        if (isFunction(onSelect)) {
          return onSelect(selectedItem.value);
        }
      },
    };
  };
  const preparedItems = prepareItems(children, onSelect);

  return useDownshift(preparedItems);
};

export default useSelect;
