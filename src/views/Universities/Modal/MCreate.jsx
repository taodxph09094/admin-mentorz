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
import SelectboxField from "../../../components/CustomField/SelectboxField";
import { alertService } from "../../../services/alertService";
import { useGetData } from "../../../hooks/services/useGetApi";
import { convertToFormSelect } from "../../../helpers";
import { usePostData } from "../../../hooks/services/usePostApi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EDU_URL } from "../../../constants/api";
const MCreate = (props) => {
  const { isOpen, setModalOpen, refreshParent } = props;

  const formInitValue = {
    name: "",
    shortName: "",
    educationType: "UNIVERSITY",
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
          Thêm trường đại học
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
                    Tên trường&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="name"
                    tag={Field}
                    placeholder="Nhập tên trường đại học"
                    value={values.name}
                    invalid={!!(touched.name && errors.name)}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Tên viết tắt&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="shortName"
                    type="text"
                    tag={Field}
                    placeholder="Nhập tên viết tắt"
                    value={values.shortName}
                    invalid={!!(touched.shortName && errors.shortName)}
                  />
                  <FormFeedback>{errors.shortName}</FormFeedback>
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

export default MCreate;
