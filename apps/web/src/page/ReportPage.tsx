import Title from "../component/Title";
import { useReport } from "../hook/useReport";
import SongList from "../component/Songlist";
import MoreButton from "../component/MoreButton";
import { useSong } from "../hook/useSong";
import { useState } from "react";
import ReportEditSongModal from "../component-page/report/report-editSongModal";
import type { ISong } from "../model/song";

export default function ReportPage() {
  const { reportList, deleteReport } = useReport();
  const { updateSong } = useSong();

  const [open, setOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<ISong | null>();

  function handleSubmit(song: ISong) {
    updateSong({ songId: song.id, data: song });
  }

  return (
    <>
      {selectedSong && (
        <ReportEditSongModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setSelectedSong(null);
          }}
          song={selectedSong}
          onSubmit={handleSubmit}
        />
      )}
      <div>
        <Title text="신고 관리" />
        {reportList?.map((v) => (
          <SongList
            song={v.song}
            description={v.reportCount + "건"}
            right={
              <MoreButton
                items={[
                  {
                    text: "수정",
                    onClick: () => {
                      setOpen(true);
                    },
                  },
                  {
                    text: "삭제",
                    onClick: () => deleteReport(v.song.id),
                  },
                ]}
              />
            }
          />
        ))}
      </div>
    </>
  );
}
