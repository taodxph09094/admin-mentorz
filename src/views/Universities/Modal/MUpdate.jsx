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
import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { alertService } from "../../../services/alertService";
import { usePutData } from "../../../hooks/services/usePutApi";
import { EDU_URL } from "../../../constants/api";
const MUpdate = (props) => {
  const { formValues, isOpen, setModalOpen, refreshParent } = props;

  const formInitValue = {
    name: formValues?.name,
    shortName: formValues?.shortName,
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
  const putUpdate = usePutData(
    null,
    true,
    null,
    false,
    false,
    putSuccess,
    putFail
  );
  const onConfirm = (values) => {
    putUpdate
      ._putData(`${EDU_URL.UPDATE_UNIVERSITY}/${formValues?._id}`, values)
      .then();
  };
  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          Chỉnh sửa thông tin trường
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
                    CANCEL
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

export default MUpdate;
