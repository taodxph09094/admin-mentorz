import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import React, { useState } from "react";
import { alertService } from "../../../services/alertService";
import { usePostData } from "../../../hooks/services/usePostApi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EDU_URL } from "../../../constants/api";
const ClassCreate = (props) => {
  const { isOpen, setModalOpen, refreshParent } = props;

  const formInitValue = {
    logo: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên trường không được để trống"),
    shortName: Yup.string().required("Tên viết tắt trường không được để trống"),
  });

  const putSuccess = (val) => {
    if (val?.status + "" === "201") {
      alertService.success("Thêm mới thành công");
    }
    setModalOpen(false);
    refreshParent();
  };

  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };

  const postCreate = usePostData(
    null,
    true,
    null,
    false,
    false,
    putSuccess,
    putFail
  );

  const onConfirm = (values) => {
    void postCreate._postData(`${EDU_URL.CREATE_UNIVERSITY}`, values);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          Thêm thông tin lớp học
        </h3>
        <button
          aria-label="Close"
          className="close"
          type="button"
          onClick={() => setModalOpen(false)}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Formik
          initialValues={formInitValue}
          validationSchema={validationSchema}
          onSubmit={onConfirm}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form>
              <Row>
                <FormGroup className="col-sm-12">
                  <Label>
                    Logo: &nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="logo"
                    type="file"
                    accept="images/*"
                    tag={Field}
                    min={1}
                    max={12}
                    invalid={!!(touched.logo && errors.logo)}
                  />
                  <FormFeedback>{errors.logo}</FormFeedback>
                </FormGroup>
              </Row>
              <Row>
                <div className="col-sm-12 text-right">
                  <Button
                    color="default"
                    outline
                    type="button"
                    onClick={() => setModalOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button color="primary" type="submit">
                    OK
                  </Button>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default ClassCreate;
