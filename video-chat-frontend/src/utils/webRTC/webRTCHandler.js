import store from '../../store/store';
import { setLocalStream } from '../../store/actions/callActions';

//默认定义
const defaultConstrains = {
  video: true,
  audio: true,
};

//获取用户的本地媒体流并保存到store中
export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      console.log(stream);
    })
    .catch((error) => {
      console.log('尝试获取访问权限以获取本地媒体流时出错');
      console.log(error);
    });
};
