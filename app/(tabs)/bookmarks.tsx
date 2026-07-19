import ImageModal from '@/components/ImageModal';
import Loader from '@/components/Loader';
import { COLORS } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/feed.styles';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

export default function Bookmarks() {
  const [selectedImage, setSelectedImage] = useState("");
  const [viewImage, setViewImage] = useState(false);

  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);

  if (bookmarkedPosts === undefined) return <Loader />;
  if (bookmarkedPosts.length === 0) return <NoBookmarksFound />;

  const showLargeImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setViewImage(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>

      {/* POSTS */}
      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {bookmarkedPosts.map((post) => {
          if (!post) return null;
          return (
            <Pressable
              key={post?._id}
              style={{ width: "33.33%", padding: 1 }}
              onPress={() => showLargeImage(post.imageUrl)}
            >
              <Image
                source={post?.imageUrl}
                style={{ width: "100%", aspectRatio: 1 }}
                contentFit='cover'
                transition={200}
                cachePolicy={'memory-disk'}
              />
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Modal View */}
      <ImageModal
        imageUrl={selectedImage}
        visible={viewImage}
        onClose={() => setViewImage(false)}
      />
    </View>
  );
}

const NoBookmarksFound = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <Text style={{ color: COLORS.primary, fontSize: 22 }}>No bookmarked posts yet</Text>
    </View>
  );
};