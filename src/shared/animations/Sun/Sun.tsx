import React, {LegacyRef, MutableRefObject} from 'react';
import LottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';
import sunAnimation from '../../../assets/animations/sun.json';

interface SunProps {
  lottieRef: MutableRefObject<LottieView | undefined>;
  isInfinityLoop: boolean;
  autoPlay: boolean;
  onAnimationEnd?: () => void;
}

const Sun: React.FC<SunProps> = ({
  lottieRef,
  isInfinityLoop,
  onAnimationEnd,
  autoPlay,
}) => {
  return (
    <LottieView
      ref={lottieRef as LegacyRef<LottieView>}
      source={sunAnimation}
      autoPlay={autoPlay}
      loop={isInfinityLoop}
      onAnimationFinish={onAnimationEnd}
      style={styles.lottie}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Sun;
