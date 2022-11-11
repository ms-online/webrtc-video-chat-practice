import React from 'react';
import { connect } from 'react-redux';
import { callStates } from '../../../../store/actions/callActions';
import GroupCallButton from '../GroupCallButton/GroupCallButton';

const GroupCall = ({ callState, localStream }) => {
  const createRoom = () => {
    //创建房间
  };
  return (
    <>
      {localStream && callState !== callStates.CALL_IN_PROGRESS && (
        <GroupCallButton onClickHandler={createRoom} label='创建房间' />
      )}
    </>
  );
};

const mapStateTopProps = ({ call }) => ({
  ...call,
});

export default connect(mapStateTopProps)(GroupCall);
