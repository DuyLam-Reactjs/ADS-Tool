import React from 'react'
import TablesContentList from "../../base/tables/TablesContentList";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle, CInput, CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";


const ContentList = () => {
  return (
    <div>
      <h2><strong>Content List</strong></h2>
      <CRow className={'justify-content-between'} style={{marginBottom: '1rem'}}>
        {DataContent && (DataContent || []).map((item, index)=>{
          return (
            <CCol>
              <p style={{marginBottom:'0.5rem'}}>{item?.name}</p>
              <td>
                <CDropdown className="m-1 btn-group">
                  <CDropdownToggle color="secondary">
                    Tất cả
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem header>Header</CDropdownItem>
                    <CDropdownItem disabled>Action Disabled</CDropdownItem>
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem>Another Action</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </td>
            </CCol>
          )
        })}
        <CCol>
          <td>
            <p></p>
            <CInputGroup>
              <CInput type="text" placeholder="Tìm phim / show / kênh" autoComplete="search"  />
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
              </CInputGroupPrepend>
            </CInputGroup>
          </td>
        </CCol>
      </CRow>
      <div>
        <TablesContentList/>
      </div>
    </div>
  )
}
const DataContent = [
  {id: 1, name:'Loại nội dung'},
  {id: 2, name:'Thể loại'},
  {id: 3, name:'Content provider'},
  {id: 4, name:'Ads group'},
]
export default ContentList
