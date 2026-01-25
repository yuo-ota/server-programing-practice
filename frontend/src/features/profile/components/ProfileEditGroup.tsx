import { checkUserId } from '@/api/SettingApi';
import SNSInputGroup from '@/components/SNSInputGroup';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { isCheckUserIdResponse } from '@/interfaces/api/setting';
import type { SNSInputValue } from '@/interfaces/app/snsInput';
import { getUserId } from '@/utils/handleLocalStorage';

interface SettingItemGroupProps {
  displayName: string;
  setDisplayName: (displayName: string) => void;
  displayNameError: string;
  setDisplayNameError: (displayNameError: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  userIdError: string;
  setUserIdError: (userIdError: string) => void;
  introduction: string;
  setIntroduction: (introduction: string) => void;
  introductionError: string;
  setIntroductionError: (introductionError: string) => void;
  SNSInputs: SNSInputValue[];
  setSNSInputs: React.Dispatch<React.SetStateAction<SNSInputValue[]>>;
}

const ProfileEditGroup = ({
  displayName,
  setDisplayName,
  displayNameError,
  setDisplayNameError,
  userId,
  setUserId,
  userIdError,
  setUserIdError,
  introduction,
  setIntroduction,
  setIntroductionError,
  SNSInputs,
  setSNSInputs,
}: SettingItemGroupProps) => {
  /**
   * 表示名入力時の処理
   * @param e
   */
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  /**
   * ユーザーID入力時の処理
   * @param e
   */
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  /**
   * 自己紹介入力時の処理
   * @param e
   */
  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIntroduction(e.target.value);
  };

  /**
   * 表示名入力欄からフォーカスが外れたときの処理
   */
  const handleDisplayNameBlur = () => {
    if (displayName === '') {
      setDisplayNameError('表示名を入力してください');
      return;
    }
    setDisplayNameError('');
  };

  /**
   * ユーザーID入力欄からフォーカスが外れたときの処理
   */
  const handleUserIdBlur = async () => {
    if (userId === '') {
      setUserIdError('ユーザーIDを入力してください');
      return;
    }

    if (userId.length < 3 || userId.length > 15) {
      setUserIdError('ユーザーIDは3文字以上15文字以下で入力してください');
      return;
    }

    try {
      const response = await checkUserId(userId);

      if (isCheckUserIdResponse(response.data) === false) {
        setUserIdError('サーバー応答が不正です。後でもう一度お試しください。');
        return;
      }

      if (response.data.available === false && userId !== getUserId()) {
        setUserIdError('そのユーザーIDはすでに使用されています');
        return;
      }
      setUserIdError('');
    } catch {
      setUserIdError(
        'サーバーで問題が発生しました。しばらくしてから再度お試しください。'
      );
    }
  };

  /**
   * 自己紹介入力欄からフォーカスが外れたときの処理
   */
  const handleIntroductionBlur = () => {
    if (introduction.length > 140) {
      setIntroductionError('自己紹介は140文字以下で入力してください');
      return;
    }
    setIntroductionError('');
  };

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2.5">
          <TextInput
            label="表示名"
            placeholder="example"
            error={displayNameError}
            id="displayName-input"
            value={displayName}
            onChange={handleDisplayNameChange}
            onBlur={handleDisplayNameBlur}
            className="h-[88.5px]"
            displayStatus={'normal'}
            prefix={''}
            isUnroundedLeft={false}
          />
          <TextInput
            label="ユーザーID(3文字以上15文字以下)"
            placeholder="example"
            error={userIdError}
            id="userId-input"
            value={userId}
            onChange={handleUserIdChange}
            onBlur={handleUserIdBlur}
            className="h-[88.5px]"
            displayStatus={'normal'}
            prefix={''}
            isUnroundedLeft={false}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <TextArea
            label="自己紹介"
            limit={140}
            placeholder="自己紹介を入力してください"
            id="introduction-input"
            value={introduction}
            onChange={handleIntroductionChange}
            onBlur={handleIntroductionBlur}
            className=""
          />
        </div>
        <div className="mt-3 flex flex-col">
          <label className="text-foreground text-subtitle">SNS ID</label>
          <label className="text-annotation text-body">
            他SNSのリンクをプロフィールに添付できます
          </label>
          <SNSInputGroup
            className="w-full"
            setSNSInputs={setSNSInputs}
            SNSInputs={SNSInputs}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileEditGroup;
