/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import images from '../assets/images';
import Text from './Text';

const steps = [
  {label: 'Basic\nDetails', stepId: 1},
  {label: 'Business\nLocation', stepId: 2},
  {label: 'Required\nDocuments', stepId: 3},
  {label: 'Banking\nDetails', stepId: 4},
];

const StepTracker = ({errorSteps = []}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 10,
      }}>
      <View style={styles.container}>
        {steps.map((step, index) => {
          const isLastStep = index === steps.length - 1;
          const isError = errorSteps.includes(step.stepId);

          return (
            <View
              key={index}
              style={[styles.stepItem, isLastStep && {flex: 0}]}>
              <View style={styles.iconRow}>
                <Image
                  source={isError ? images.infoStatus : images.successCheck}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
                {!isLastStep && <View style={styles.dashLine} />}
              </View>

              <Text
                size={'small'}
                hankenGroteskSemiBold={true}
                style={[
                  styles.label,
                  isError ? styles.errorText : styles.completedText,
                ]}>
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 0,
    marginRight: 0,
  },
  stepItem: {
    flex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    height: 24,
    width: 24,
  },
  dashLine: {
    height: 1,
    flex: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
  },
  label: {
    marginTop: 8,
    lineHeight: 16,
  },
  completedText: {
    color: '#4CAF50',
  },
  errorText: {
    color: '#FF3B30',
  },
});

export default StepTracker;

// import React from 'react';
// import {View, StyleSheet, Image} from 'react-native';
// import images from '../assets/images';
// import Text from './Text';

// const steps = [
//   {label: 'Basic\nDetails', status: 'completed', stepId: 1},
//   {label: 'Business\nLocation', status: 'completed', stepId: 2},
//   {label: 'Required\nDocuments', status: 'error', stepId: 3},
//   {label: 'Banking\nDetails', status: 'completed', stepId: 4},
// ];

// const StepTracker = ({stepCount}) => {
//   return (
//     <View
//       style={{
//         backgroundColor: 'white',
//         paddingHorizontal: 24,
//         paddingVertical: 10,
//       }}>
//       <View style={styles.container}>
//         {steps.map((step, index) => {
//           const isLastStep = index === steps.length - 1;

//           return (
//             <View
//               key={index}
//               style={[styles.stepItem, isLastStep && {flex: 0}]}>
//               <View style={styles.iconRow}>
//                 <Image
//                   source={
//                     step.stepId === stepCount
//                       ? images.infoStatus
//                       : images.successCheck
//                   }
//                   style={styles.iconImage}
//                   resizeMode="contain"
//                 />

//                 {!isLastStep && <View style={styles.dashLine} />}
//               </View>

//               <Text
//                 size={'small'}
//                 hankenGroteskSemiBold={true}
//                 style={[
//                   styles.label,
//                   step.stepId === stepCount && styles.errorText,
//                 ]}>
//                 {step.label}
//               </Text>
//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     // paddingHorizontal: 16,
//     // justifyContent: 'space-between',
//     // alignItems: 'flex-start',
//     paddingRight: 0,
//     marginRight: 0,
//   },
//   stepItem: {
//     flex: 1,
//     // alignItems: 'center',
//     // width: '25%',
//   },
//   iconRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconImage: {
//     height: 24,
//     width: 24,
//   },
//   dashLine: {
//     height: 1,
//     flex: 1,
//     borderStyle: 'dashed',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginHorizontal: 5,
//   },
//   label: {
//     marginTop: 8,
//     // textAlign: 'center',
//     lineHeight: 16,
//     color: '#4CAF50',
//   },
//   completedText: {
//     color: '#4CAF50',
//   },
//   errorText: {
//     color: '#FF3B30',
//   },
// });

// export default StepTracker;

// Uncommnet for array

// const StepTracker = ({steps}) => {
//   return (
//     <View style={styles.container}>
//       {steps.map((step, index) => {
//         const isLastStep = index === steps.length - 1;

//         return (
//           <View key={index} style={[styles.stepItem, isLastStep && {flex: 0}]}>
//             <View style={styles.iconRow}>
//               <Image
//                 source={
//                   step.status === 'completed'
//                     ? images.successCheck
//                     : step.status === 'error'
//                     ? images.infoStatus
//                     : images.successCheck
//                 }
//                 style={styles.iconImage}
//                 resizeMode="contain"
//               />

//               {!isLastStep && <View style={styles.dashLine} />}
//             </View>

//             <Text
//               size={'small'}
//               hankenGroteskSemiBold={true}
//               style={[
//                 styles.label,
//                 step.status === 'completed' && styles.completedText,
//                 step.status === 'error' && styles.errorText,
//               ]}>
//               {step.label}
//             </Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     // paddingHorizontal: 16,
//     // justifyContent: 'space-between',
//     // alignItems: 'flex-start',
//     paddingRight: 0,
//     marginRight: 0,
//   },
//   stepItem: {
//     flex: 1,
//     // alignItems: 'center',
//     // width: '25%',
//   },
//   iconRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconImage: {
//     height: 24,
//     width: 24,
//   },
//   dashLine: {
//     height: 1,
//     flex: 1,
//     borderStyle: 'dashed',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginHorizontal: 5,
//   },
//   label: {
//     marginTop: 8,
//     // textAlign: 'center',
//     lineHeight: 16,
//   },
//   completedText: {
//     color: '#4CAF50',
//   },
//   errorText: {
//     color: '#FF3B30',
//   },
// });

// export default StepTracker;
