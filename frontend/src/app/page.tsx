import ShareCard from "@/components/ShareCard";

export default function Home() {
  return (
    <main>
      <div className="mt-8 mx-24">
        <ShareCard
          videoId="dQw4w9WgXcQ"
          title="Rick Astley - Never Gonna Give You Up"
          description="The official video for “Never Gonna Give You Up” by Rick Astley"
          sharedBy="John Doe"
        />
      </div>
    </main>
  );
}
