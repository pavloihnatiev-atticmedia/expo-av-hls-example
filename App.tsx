import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Video
        ref={video}
        style={styles.video}
        source={{
          // uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", // mp4 video works fine
          uri: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8", // HLS video - you can hear only soud, but don't see the video picture
        }}
        // useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {!!status?.isLoaded && (
        <Button
          title={status?.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status?.isPlaying
              ? video.current?.pauseAsync()
              : video.current?.playAsync()
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    height: 300,
    backgroundColor: "#cccccc",
  },
});
