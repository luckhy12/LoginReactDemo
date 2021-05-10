import ActionConstants from "../config/AppConstants";

const innitialVoiceData = {
    voiceCallLogsData: [],
  };

  export default function voiceCallLogs(state = innitialVoiceData, action) {
    switch (action.type) {
      case ActionConstants.GET_VOICE_CALL_LOG: {
        return {
          ...state,
          voiceCallLogsData: action.data,
        };
      }
      default:
        return { ...state };
    }
  }