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
const SchoolUpdate = (props) => {
  const { formValues, isOpen, setModalOpen, refreshParent } = props;

  const formInitValue = {
    name: formValues?.name,
    subjects: formValues?.subjects,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên trường không được để trống"),
    subjects: Yup.string().required("Số lượng môn học không được để trống"),
    student: Yup.string().required("Số lượng học sinh không được để trống"),
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
      ._putData(`${EDU_URL.UPDATE_HIGHSCHOOL}/${formValues?._id}`, values)
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
                    Tên lớp&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="name"
                    tag={Field}
                    placeholder="Nhập tên lớp học"
                    value={values.name}
                    defaultValue={values.name}
                    invalid={!!(touched.name && errors.name)}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Số lượng môn học&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="subjects"
                    type="number"
                    tag={Field}
                    placeholder="Nhập số lượng môn học"
                    value={values.subjects}
                    defaultValue={values.subjects}
                    invalid={!!(touched.subjects && errors.subjects)}
                  />
                  <FormFeedback>{errors.subjects}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Số lượng học sinh&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="students"
                    type="number"
                    tag={Field}
                    placeholder="Số lượng học sinh"
                    value={values.students}
                    defaultChecked={values.students}
                    invalid={!!(touched.students && errors.students)}
                  />
                  <FormFeedback>{errors.students}</FormFeedback>
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
                  <Button color="primary" type="submit" onClick={handleSubmit}>
                    Lưu
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

export default SchoolUpdate;
