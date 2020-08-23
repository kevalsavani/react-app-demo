import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';

const DeleteModal = (props) => {

  const dispatch = useDispatch;

  let [visible, setVisible] = useState(false);
  let [confirmLoading, setConfirmLoading] = useState(false);
  let [modalText, setModalText] = useState("Are you sure want to delete this record?");
  let [okText, setOkText] = useState("Delete");

  useEffect(() => {
    //setVisible(props.visible);
    if (props.visible===false) {
      // Reset modal
      setConfirmLoading(false);
      setOkText("Delete");
      setModalText("Are you sure want to delete this record?")
    }
  },[props.visible]);

  const handleOk = () => {
    setConfirmLoading(true);
    setOkText("Deleting...");
    props.deleteRequest()
  };

  return (
    <Modal
      title="Heads Up!!!"
      wrapClassName="wrapClassName"
      visible={props.visible}
      onOk={handleOk}
      okText={okText}
      okType="danger"
      confirmLoading={confirmLoading}
      onCancel={props.handelCancelDeleteModal}
    ><p>{modalText}</p></Modal>
  );

}

export default DeleteModal;