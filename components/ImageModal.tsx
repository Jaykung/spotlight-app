import { Image } from 'expo-image';
import { Modal, Pressable, View } from 'react-native';

type ImageModalProps = {
  imageUrl: string;
  visible: boolean;
  onClose: () => void;
};

export default function ImageModal({ imageUrl, visible, onClose }: ImageModalProps) {
  return (
    <Modal visible={visible} animationType='fade' transparent={true} onFocus={onClose}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.8)"
        }}
        onPress={onClose}
      >
        <Image
          source={imageUrl}
          style={{ width: "95%", aspectRatio: 1 }}
          contentFit='cover'
          transition={200}
          cachePolicy={'memory-disk'}
        />
      </Pressable>
    </Modal>
  );
}