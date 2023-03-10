import React, { useEffect, useState } from "react";
import BaseAdminContainer from "../../../components/BaseAdminContainer";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  PopoverBody,
  UncontrolledPopover,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import * as moment from "moment";
import { RouteBase } from "../../../constants/routeUrl";
import CustomDataTable from "../../../components/Core/CustomDataTable";
import { Link } from "react-router-dom";
import Panels from "../../../components/Core/Panels";
import * as classnames from "classnames";
import { usePostData } from "../../../hooks/services/usePostApi";
import { alertService } from "../../../services/alertService";
import { useGetData } from "../../../hooks/services/useGetApi";
import { EDU_URL } from "../../../constants/api";
import MCreateMajor from "./Modal/MCreateMajor";
import MCreateSubject from "./Modal/MCreateSubject";
import MAddMajor from "./Modal/MAddMajor";
const UniversityDetail = (props) => {
  const history = useHistory();
  const initParams = {
    page: 0,
    size: 20,
  };
  const back = () => {
    history.push("/admin" + RouteBase.Universities);
  };

  const styleBtn = { color: "#f80031", cursor: "pointer", margin: 5 };
  const idPopover = "tooltip876279349";
  const id = new URLSearchParams(props.location.search).get("id");
  const [modalOpen, setModalOpen] = useState(false);
  const [paramRequest, setParamRequest] = useState(initParams);
  const [updated, setUpdated] = useState(false);
  const getUniversityDetails =
    useGetData(`${EDU_URL.GET_UNIVERSITY_DETAIL}/${id}`) || null;
  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getUniversityDetails._getData(null);
    }
    return () => {
      isCurrent = false;
    };
  }, [updated, paramRequest]);
  //modal update University
  function openModalMerchant() {
    setModalOpen(!modalOpen);
  }
  function refreshPage() {
    setUpdated(!updated);
  }
  const closePopover = () => {
    document.getElementById(idPopover).click();
  };
  //tabs
  const [activeTab, setActiveTab] = useState("1");
  const [activeTabProduct, setActiveTabProduct] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const toggleProduct = (tab) => {
    if (activeTabProduct !== tab) {
      setActiveTabProduct(tab);
    }
  };
  //end tabs

  //table

  //major table
  const majorColumns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "T??n chuy??n ng??nh",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <>
            <AiOutlineEdit
              style={styleBtn}
              // onClick={(event) => update(event, row)}
            />
            <AiOutlineDelete style={styleBtn} />
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "H??nh ?????ng",
    },
  ];

  //subjectTable
  const subjectColumns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "T??n m??n h???c",
      // selector: (row) => row.name,
      selector: (row) => {
        return (
          <Link to={`/admin${RouteBase.SubjectDetail}?id=${row?._id}`}>
            {row.name}
          </Link>
        );
      },
      sortable: true,
    },
    {
      name: "N???i dung",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <>
            <AiOutlineEdit
              style={styleBtn}
              // onClick={(event) => update(event, row)}
            />
            <AiOutlineDelete style={styleBtn} />
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "H??nh ?????ng",
    },
  ];

  //student table
  const studentColumns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "T??n sinh vi??n",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <>
            <AiOutlineEdit
              style={styleBtn}
              // onClick={(event) => update(event, row)}
            />
            <AiOutlineDelete style={styleBtn} />
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "H??nh ?????ng",
    },
  ];
  //end table

  //modal
  function refreshTable() {
    setParamRequest({ ...paramRequest, page: 0 });
  }
  const [modalOpenCreateMajor, setModalOpenCreateMajor] = useState(false);
  function openModalCreateMajor() {
    setModalOpenCreateMajor(!modalOpenCreateMajor);
  }
  const [modalOpenAddMajor, setModalOpenAddMajor] = useState(false);
  function openModalAddMajor() {
    setModalOpenAddMajor(!modalOpenAddMajor);
  }
  const [modalOpenCreateSubject, setModalOpenCreateSubject] = useState(false);
  function openModalCreateSubject() {
    setModalOpenCreateSubject(!modalOpenCreateSubject);
  }
  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        {/* university details */}
        <Card className="bg-secondary shadow border-0 mt-5">
          <Panels>
            <div className="d-flex">
              <h1>{getUniversityDetails?.data?.name || ""}</h1>
              <Button
                className="ml-auto"
                color="primary"
                onClick={openModalMerchant}
              >
                Ch???nh s???a
              </Button>
              <Button
                className="ml-1"
                color={
                  getUniversityDetails?.data?.status ? "danger" : "success"
                }
                // onClick={() =>
                //   changeStatusOfMerchant(!!getMerchantDetails?.data?.enabled)
                // }
              >
                {getUniversityDetails?.data?.status ? "Block" : "Active"}
              </Button>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">?????a ch???: </span>
                {/* {getUniversityDetails?.data?.address || ""} */}
                H?? N???i
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">T??n vi???t t???t: </span>
                {getUniversityDetails?.data?.shortName || ""}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">Tr???ng th??i: </span>

                <Badge
                  color={
                    getUniversityDetails?.data?.status ? "success" : "danger"
                  }
                >
                  {getUniversityDetails?.data?.status ? "Active" : "Block"}
                </Badge>
              </div>
            </div>
          </Panels>
        </Card>
        {/*end university details */}
        {/* <MUpdateMerchant
          isUpdate={true}
          formValue={getMerchantDetails?.data}
          isOpen={modalOpen}
          setModalOpen={setModalOpen}
          refreshParent={refreshPage}
        /> */}
        <br />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => toggle("1")}
              style={{ cursor: "pointer" }}
            >
              Chuy??n ng??nh
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => toggle("2")}
              style={{ cursor: "pointer" }}
            >
              M??n h???c
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => toggle("3")}
              style={{ cursor: "pointer" }}
            >
              Sinh vi??n
            </NavLink>
          </NavItem>
        </Nav>
        {/* tabs details */}
        <TabContent className="tabs-table" activeTab={activeTab}>
          {/* tabs Majors list */}
          <TabPane tabId="1">
            <Card className="bg-secondary shadow border-0 mt-4">
              <div className="d-flex">
                <h3>Danh s??ch chuy??n ng??nh</h3>
                <Button
                  className="ml-auto"
                  color="primary"
                  onClick={openModalAddMajor}
                >
                  ADD
                </Button>
                <Button
                  className="ml-auto"
                  color="primary"
                  onClick={openModalCreateMajor}
                >
                  Th??m chuy??n ng??nh
                </Button>
              </div>
              <div className="form-group">
                <CustomDataTable
                  data={getUniversityDetails?.data?.majors}
                  columns={majorColumns}
                  progressPending={getUniversityDetails?.isLoading}
                  pagination
                  paginationServer
                  paginationTotalRows={
                    getUniversityDetails?.data?.pagination?.totalRecords ?? 0
                  }
                  onChangeRowsPerPage={(val) => {
                    setParamRequest({ ...paramRequest, size: val, page: 0 });
                  }}
                  onChangePage={(val) => {
                    setParamRequest({ ...paramRequest, page: val - 1 });
                  }}
                />
              </div>
            </Card>
            <MCreateMajor
              isUpdate={false}
              isOpen={modalOpenCreateMajor}
              setModalOpen={setModalOpenCreateMajor}
              refreshParent={refreshTable}
              universityId={id}
            />
            <MAddMajor
              isUpdate={false}
              isOpen={modalOpenAddMajor}
              setModalOpen={setModalOpenAddMajor}
              refreshParent={refreshTable}
              universityId={id}
            />
          </TabPane>
          {/* tabs subject list */}
          <TabPane tabId="2">
            <Card className="bg-secondary shadow border-0 mt-4">
              <div className="d-flex">
                <h3>Danh s??ch m??n h???c</h3>
                <Button
                  className="ml-auto"
                  color="primary"
                  onClick={openModalCreateSubject}
                >
                  Th??m m??n h???c
                </Button>
              </div>
              <div className="form-group">
                <CustomDataTable
                  data={getUniversityDetails?.data?.subjects}
                  columns={subjectColumns}
                  progressPending={getUniversityDetails?.isLoading}
                  pagination
                  paginationServer
                  paginationTotalRows={
                    getUniversityDetails?.data?.subjects?.pagination
                      ?.totalRecords ?? 0
                  }
                  onChangeRowsPerPage={(val) => {
                    setParamRequest({ ...paramRequest, size: val, page: 0 });
                  }}
                  onChangePage={(val) => {
                    setParamRequest({ ...paramRequest, page: val - 1 });
                  }}
                />
              </div>
            </Card>
            <MCreateSubject
              isOpen={modalOpenCreateSubject}
              setModalOpen={setModalOpenCreateSubject}
              refreshParent={refreshTable}
            />
          </TabPane>
          <TabPane tabId="3">
            <Card className="bg-secondary shadow border-0 mt-4">
              <div className="d-flex">
                <h3>Danh s??ch sinh vi??n</h3>
              </div>
              <div className="form-group">
                <CustomDataTable
                  data={getUniversityDetails?.data?.students}
                  columns={studentColumns}
                  progressPending={getUniversityDetails?.isLoading}
                  pagination
                  paginationServer
                  paginationTotalRows={
                    getUniversityDetails?.data?.students?.pagination
                      ?.totalRecords ?? 0
                  }
                  onChangeRowsPerPage={(val) => {
                    setParamRequest({ ...paramRequest, size: val, page: 0 });
                  }}
                  onChangePage={(val) => {
                    setParamRequest({ ...paramRequest, page: val - 1 });
                  }}
                />
              </div>
            </Card>
          </TabPane>
        </TabContent>

        <br />
        <div>
          <Button color="default" outline type="button" onClick={back}>
            <i className="ni ni-bold-left" /> Quay l???i
          </Button>
        </div>
      </Container>
    </BaseAdminContainer>
  );
};

export default UniversityDetail;
