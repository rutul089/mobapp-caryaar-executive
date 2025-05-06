import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Pressable, Text} from '@caryaar/components';

/**
 * @typedef {Object} DropdownItem
 * @property {any} [value] - The unique value of the item.
 * @property {string} [label] - The default label if no custom key is used.
 * @property {any} [key] - Optional unique identifier.
 * @property {Object} [otherProps] - Any other dynamic fields.
 */

/**
 * @typedef {Object} DropdownProps
 * @property {DropdownItem[]} options - The dropdown list items.
 * @property {any} selectedValue - The currently selected value.
 * @property {(item: DropdownItem) => void} onSelect - Callback on item selection.
 * @property {boolean} isVisible - Whether the dropdown should be rendered.
 * @property {string} [labelKey="label"] - Key in each item used to display text.
 */

/**
 * Dropdown - A scrollable, selectable dropdown list with dynamic label support.
 *
 * @param {DropdownProps} props
 */
const Dropdown = ({
  options = [],
  selectedValue,
  onSelect,
  isVisible,
  labelKey = 'label',
}) => {
  if (!isVisible || !options.length) {
    return null;
  }

  return (
    <View style={styles.dropdown}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {options.map((item, index) => {
          const isLastItem = index === options.length - 1;
          const displayLabel = item[labelKey];

          return (
            <Pressable
              key={item.key || index}
              style={[styles.item, isLastItem && styles.noBorder]}
              onPress={() => onSelect?.(item)}>
              <Text
                hankenGroteskSemiBold={selectedValue === displayLabel}
                size="small"
                lineHeight="small">
                {displayLabel}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const baseItemStyle = {
  height: 45,
  justifyContent: 'center',
  paddingHorizontal: 10,
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 2,
    backgroundColor: '#fff',
  },
  scroll: {
    maxHeight: 200,
  },
  item: {
    ...baseItemStyle,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
});

export default Dropdown;

// import React, {useState, useEffect} from 'react';
// import {StyleSheet, View, ScrollView} from 'react-native';
// import {Pressable, Text} from '@caryaar/components';

// /**
//  * @typedef {Object} DropdownProps
//  * @property {Array<Object>} options - Array of options to display.
//  * @property {Object|Array<Object>} [selectedValue] - Initial selected value(s).
//  * @property {(item: Object|Array<Object>) => void} onSelect - Callback when selection changes.
//  * @property {boolean} isVisible - Controls visibility of the dropdown.
//  * @property {string} [labelKey] - Key in option objects used as label. Default is "label".
//  * @property {boolean} [multiSelect] - Enable multiple selection. Default is false.
//  */

// /**
//  * Dropdown component supporting single and multi-select
//  *
//  * @param {DropdownProps} props
//  */
// const Dropdown = ({
//   options = [],
//   selectedValue,
//   onSelect,
//   isVisible,
//   labelKey = 'label',
//   multiSelect = false,
// }) => {
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     if (multiSelect && Array.isArray(selectedValue)) {
//       setSelectedItems(selectedValue);
//     } else if (!multiSelect && selectedValue) {
//       setSelectedItems([selectedValue]);
//     } else {
//       setSelectedItems([]);
//     }
//   }, [selectedValue, multiSelect]);

//   if (!isVisible || !options.length) {
//     return null;
//   }

//   const isSelected = item => {
//     return selectedItems.some(
//       selected => selected[labelKey] === item[labelKey],
//     );
//   };

//   const handlePress = item => {
//     if (multiSelect) {
//       const alreadySelected = isSelected(item);
//       const updated = alreadySelected
//         ? selectedItems.filter(i => i[labelKey] !== item[labelKey])
//         : [...selectedItems, item];
//       setSelectedItems(updated);
//       onSelect?.(updated);
//     } else {
//       setSelectedItems([item]);
//       onSelect?.(item);
//     }
//   };

//   return (
//     <View style={styles.dropdown}>
//       <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
//         {options.map((item, index) => {
//           const isLast = index === options.length - 1;
//           return (
//             <Pressable
//               key={index}
//               style={[styles.item, isLast && styles.lastItem]}
//               onPress={() => handlePress(item)}>
//               <Text
//                 hankenGroteskSemiBold={isSelected(item)}
//                 size="small"
//                 lineHeight="small">
//                 {item[labelKey]}
//               </Text>
//             </Pressable>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const baseItemStyle = {
//   height: 45,
//   justifyContent: 'center',
//   paddingHorizontal: 10,
// };

// const styles = StyleSheet.create({
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginTop: 2,
//     backgroundColor: '#fff',
//   },
//   scroll: {
//     maxHeight: 200,
//   },
//   item: {
//     ...baseItemStyle,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   lastItem: {
//     borderBottomWidth: 0,
//   },
// });

// export default Dropdown;
