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
const SubjectDetail = (props) => {
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
  const [modalOpen, setModalOpen] = useState(false);
  const id = new URLSearchParams(props.location.search).get("id");
  const [paramRequest, setParamRequest] = useState(initParams);
  const [updated, setUpdated] = useState(false);

  const getSubjectDetails =
    useGetData(`${EDU_URL.GET_SUBJECT_DETAIL}/${id}`) || null;
  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getSubjectDetails._getData(null);
    }
    return () => {
      isCurrent = false;
    };
  }, [updated, paramRequest]);

  const getTestBySubject = usePostData(null, true, null, false, false);
  const getCourseBySubject = usePostData(null, true, null, false, false);
  useEffect(() => {
    const payload = {
      filterQuery: {
        subjectId: getSubjectDetails?.data?._id,
      },
      options: {
        sort: { downloaded: -1, viewed: 1 },
        limit: 10,
        page: 1,
      },
    };
    getTestBySubject._postData(EDU_URL.GET_TEST_BY_SUBJECT, payload).then();
    getCourseBySubject._postData(EDU_URL.GET_COURSE_BY_SUBJECT, payload).then();
  }, [paramRequest]);
  function openModal() {
    setModalOpen(!modalOpen);
  }
  function refreshPage() {
    setUpdated(!updated);
  }
  const closePopover = () => {
    document.getElementById(idPopover).click();
  };
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
  const testColumns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Bộ bài thi",
      //   selector: (row) => row.name,
      selector: (row) => {
        return (
          <Link to={`/admin${RouteBase.TestDetails}?id=${row?._id}`}>
            {row.name}
          </Link>
        );
      },
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
      name: "Hành động",
    },
  ];
  const courseColumns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Tên khóa học",
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
      name: "Đối tượng tài khoản",
      // selector: (row) => row.name,
      selector: (row) => row.plan,
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
      name: "Hành động",
    },
  ];
  function refreshTable() {
    setParamRequest({ ...paramRequest, page: 0 });
  }
  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0 mt-5">
          <Panels>
            <div className="d-flex">
              <h1>{getSubjectDetails?.data?.name || ""}</h1>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">Tên viết tắt: </span>
                {getSubjectDetails?.data?.description || ""}
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">Số bài test: </span>
                {getSubjectDetails?.data?.countTests}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <span className="font-weight-bold">Trạng thái: </span>

                <Badge
                  color={getSubjectDetails?.data?.status ? "success" : "danger"}
                >
                  {getSubjectDetails?.data?.status ? "Active" : "Block"}
                </Badge>
              </div>
              <div className="col-sm-6">
                <span className="font-weight-bold">Số khóa học: </span>
                {getSubjectDetails?.data?.countCourses}
              </div>
            </div>
          </Panels>
        </Card>
        <br />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => toggle("1")}
              style={{ cursor: "pointer" }}
            >
              Test
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => toggle("2")}
              style={{ cursor: "pointer" }}
            >
              Khóa học
            </NavLink>
          </NavItem>
        </Nav>
        {/* tabs details */}
        <TabContent className="tabs-table" activeTab={activeTab}>
          <TabPane tabId="1">
            <Card className="bg-secondary shadow border-0 mt-4">
              <div className="d-flex">
                <h3>Danh sách bài test</h3>
              </div>
              <div className="form-group">
                <CustomDataTable
                  data={getTestBySubject?.data?.data?.docs}
                  columns={testColumns}
                  progressPending={getTestBySubject?.isLoading}
                  pagination
                  paginationServer
                  paginationTotalRows={
                    getTestBySubject?.data?.pagination?.totalRecords ?? 0
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
          <TabPane tabId="2">
            <Card className="bg-secondary shadow border-0 mt-4">
              <div className="d-flex">
                <h3>Danh sách khóa học</h3>
              </div>
              <div className="form-group">
                <CustomDataTable
                  data={getCourseBySubject?.data?.data?.docs}
                  columns={courseColumns}
                  progressPending={getCourseBySubject?.isLoading}
                  pagination
                  paginationServer
                  paginationTotalRows={
                    getCourseBySubject?.data?.pagination?.totalRecords ?? 0
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
            <i className="ni ni-bold-left" /> Quay lại
          </Button>
        </div>
      </Container>
    </BaseAdminContainer>
  );
};

export default SubjectDetail;
