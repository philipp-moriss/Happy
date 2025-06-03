import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

type UseUpdateReturnType = {
  isUpdate: boolean;
  onCloseUpdateModal: () => void;
};
const useUpdate = (): UseUpdateReturnType => {
  const [isUpdate, setIsUpdate] = useState(false);
  const checkUpdate = async () => {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  };
  useEffect(() => {
    checkUpdate();
  }, []);
  return {
    isUpdate,
    onCloseUpdateModal: () => setIsUpdate(false),
  };
};

export default useUpdate;
