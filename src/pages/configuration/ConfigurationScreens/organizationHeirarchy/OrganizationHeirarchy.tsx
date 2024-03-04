/// ==============================================
// Filename:OrganizationHeirarchy.tsx
// Type: Heirarchy Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { ReactNode } from 'react'

// |-- Redux --|

// |-- Types --|
// |-- External Dependencies --|
import { Tree, TreeNode } from 'react-organizational-chart'
import { twMerge } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMMenu from 'src/components/UI/atoms/ATMMenu/ATMMenu'

import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import {
    GetHierarchByDeptProps,
    getRoleUser,
} from 'src/utils/GetHierarchyByDept'

const StyledNode = ({
    children,
    extraClasses,
    isMenu = true,
    dept = '',
    userRole,
}: {
    children: ReactNode
    extraClasses?: string
    isMenu?: boolean
    dept?: string
    userRole?: keyof typeof getRoleUser
}) => {
    const navigate = useNavigate()
    return (
        <button
            className={twMerge(
                `py-1  rounded-lg border inline-block bg-white shadow-xl  ${extraClasses}`
            )}
        >
            <div className="flex justify-between gap-3 items-center">
                <div className="px-4">{children}</div>
                {isMenu && (
                    <ATMMenu
                        orientation="vertical"
                        options={[
                            {
                                label: 'Add Policy',
                                onClick: () => {
                                    navigate(`/configurations/user-access`, {
                                        state: {
                                            dept: dept,
                                            userRole: userRole,
                                        },
                                    })
                                },
                            },
                        ]}
                    />
                )}
            </div>
        </button>
    )
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Configuration',
        path: '/dashboard',
    },
    {
        label: 'Hierarchy',
    },
]

const OrganisationHierarchy = () => {
    return (
        <div className="px-4 h-full pt-3  ">
            {/* Breadcrumbs */}
            <div className="h-[30px]">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="h-full py-4  ">
                <Tree
                    lineWidth={'2px'}
                    lineHeight={'40px'}
                    lineColor={'#bbbbcc'}
                    lineBorderRadius={'10px'}
                    label={
                        <StyledNode extraClasses="" isMenu={false}>
                            Root
                        </StyledNode>
                    }
                    // nodePadding={'50px'} // Set the padding between nodes
                    // direction={'horizontal'} // Set the direction to horizontal
                >
                    {/*  Sales */}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={GetHierarchByDeptProps.SALES_DEPARTMENT}
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Sales Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.SALE_AVP}
                                    dept={
                                        GetHierarchByDeptProps.SALES_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        dept={
                                            GetHierarchByDeptProps.SALES_DEPARTMENT
                                        }
                                        userRole={getRoleUser.SALE_AGM_SALES}
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        AGM Sales
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.MANAGER_SALES_CENTER
                                            }
                                            dept={
                                                GetHierarchByDeptProps.SALES_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Manager, Sales Center
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.ASST_MANAGER_SALES_CENTER
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.SALES_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Asst. Manager, Sales Center
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode
                                                    userRole={
                                                        getRoleUser.SR_TEAM_LEADER_OR_SR_EXECUTIVE_MIS
                                                    }
                                                    dept={
                                                        GetHierarchByDeptProps.SALES_DEPARTMENT
                                                    }
                                                    extraClasses="text-sm font-normal font-sans"
                                                >
                                                    Sr. Team
                                                    Leader/Sr.Executive, MIS
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode
                                                        userRole={
                                                            getRoleUser.TEAM_LEADER_OR_EXECUTIVE_SALES_CENTER
                                                        }
                                                        dept={
                                                            GetHierarchByDeptProps.SALES_DEPARTMENT
                                                        }
                                                        extraClasses="text-sm font-normal font-sans"
                                                    >
                                                        Team Leader/ Executive,
                                                        MIS
                                                    </StyledNode>
                                                }
                                            >
                                                <TreeNode
                                                    label={
                                                        <StyledNode
                                                            userRole={
                                                                getRoleUser.SR_EXECUTIVE_SALES_CENTER
                                                            }
                                                            dept={
                                                                GetHierarchByDeptProps.SALES_DEPARTMENT
                                                            }
                                                            extraClasses="text-sm font-normal font-sans"
                                                        >
                                                            Sr. Executive, Sales
                                                            Center
                                                        </StyledNode>
                                                    }
                                                >
                                                    <TreeNode
                                                        label={
                                                            <StyledNode
                                                                userRole={
                                                                    getRoleUser.EXECUTIVE_SALES_CENTER
                                                                }
                                                                dept={
                                                                    GetHierarchByDeptProps.SALES_DEPARTMENT
                                                                }
                                                                extraClasses="text-sm font-normal font-sans"
                                                            >
                                                                Executive, Sales
                                                                Center
                                                            </StyledNode>
                                                        }
                                                    >
                                                        <TreeNode
                                                            label={
                                                                <StyledNode
                                                                    userRole={
                                                                        getRoleUser.EXECUTIVE_TRAINEE
                                                                    }
                                                                    dept={
                                                                        GetHierarchByDeptProps.SALES_DEPARTMENT
                                                                    }
                                                                    extraClasses="text-sm font-normal font-sans"
                                                                >
                                                                    Executive,Trainee
                                                                </StyledNode>
                                                            }
                                                        />
                                                    </TreeNode>
                                                </TreeNode>
                                            </TreeNode>
                                        </TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* Customer Department */}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={
                                    GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT
                                }
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Customer Care Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.CUSTOMER_CARE_AVP}
                                    dept={
                                        GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        dept={
                                            GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT
                                        }
                                        userRole={
                                            getRoleUser.CUSTOMER_CARE_MANAGER
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        Manager,Customer Care
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.CUSTOMER_CARE_AM
                                            }
                                            dept={
                                                GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            AM, Customer Care
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.CUSTOMER_CARE_TEAM_LEADER
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Team Leader,Customer Care
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode
                                                    userRole={
                                                        getRoleUser.CUSTOMER_CARE_SR_EXECUTIVE
                                                    }
                                                    dept={
                                                        GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT
                                                    }
                                                    extraClasses="text-sm font-normal font-sans"
                                                >
                                                    Sr. Executive, Customer Care
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode
                                                        userRole={
                                                            getRoleUser.CUSTOMER_CARE_EXECUTIVE
                                                        }
                                                        dept={
                                                            GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT
                                                        }
                                                        extraClasses="text-sm font-normal font-sans"
                                                    >
                                                        Executive, Customer Care
                                                    </StyledNode>
                                                }
                                            ></TreeNode>
                                        </TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* </TreeNode> */}
                    {/*  HR */}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                extraClasses="text-sm font-bold  font-sans"
                                dept={GetHierarchByDeptProps.HR_DEPARTMENT}
                            >
                                HR Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.HR_AVP}
                                    dept={GetHierarchByDeptProps.HR_DEPARTMENT}
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={
                                            getRoleUser.AMG_HR_AND_STATUTORY_COMPLIANCE
                                        }
                                        dept={
                                            GetHierarchByDeptProps.HR_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        AGM, HR & Statutory Compliance
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.ASST_MANAGER_HR
                                            }
                                            dept={
                                                GetHierarchByDeptProps.HR_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Asst. Manager,HR
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.SR_EXECUTIVE_HR
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.HR_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Sr. Executive,HR
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode
                                                    userRole={
                                                        getRoleUser.EXECUTIVE_HR
                                                    }
                                                    dept={
                                                        GetHierarchByDeptProps.HR_DEPARTMENT
                                                    }
                                                    extraClasses="text-sm font-normal font-sans"
                                                >
                                                    Executive,HR
                                                </StyledNode>
                                            }
                                        />
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* Distribution */}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={
                                    GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT
                                }
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Distribution Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.DISTRIBUTION_AVP}
                                    dept={
                                        GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={
                                            getRoleUser.SR_MANAGER_DISTRIBUTION
                                        }
                                        dept={
                                            GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        Sr. Manager, Distribution
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={getRoleUser.MANAGER_AREA}
                                            dept={
                                                GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Manager,Area
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.SR_EXECUTIVE_AREA
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Sr. Executive,Area
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode
                                                    userRole={
                                                        getRoleUser.EXECUTIVE_AREA
                                                    }
                                                    dept={
                                                        GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT
                                                    }
                                                    extraClasses="text-sm font-normal font-sans"
                                                >
                                                    Executive,Area
                                                </StyledNode>
                                            }
                                        />
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={GetHierarchByDeptProps.FINANCE_DEPARTMENT}
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Finance Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.FINANCE_AVP}
                                    dept={
                                        GetHierarchByDeptProps.FINANCE_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={getRoleUser.AGM_FINANCE}
                                        dept={
                                            GetHierarchByDeptProps.FINANCE_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        AGM ,Finance
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.SR_MANAGER_FINANCE
                                            }
                                            dept={
                                                GetHierarchByDeptProps.FINANCE_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Sr. Manager, Finance
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.MANAGER_FINANCE
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.FINANCE_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Manager, Finance
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode
                                                    userRole={
                                                        getRoleUser.AM_FINANCE
                                                    }
                                                    dept={
                                                        GetHierarchByDeptProps.FINANCE_DEPARTMENT
                                                    }
                                                    extraClasses="text-sm font-normal font-sans"
                                                >
                                                    AM, Finance
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode
                                                        userRole={
                                                            getRoleUser.EXECUTIVE_FINANCE
                                                        }
                                                        dept={
                                                            GetHierarchByDeptProps.FINANCE_DEPARTMENT
                                                        }
                                                        extraClasses="text-sm font-normal font-sans"
                                                    >
                                                        Executive,Finance
                                                    </StyledNode>
                                                }
                                            />
                                        </TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* MEDIA */}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={GetHierarchByDeptProps.MEDIA_DEPARTMENT}
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Media Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.MEDIA_AVP}
                                    dept={
                                        GetHierarchByDeptProps.MEDIA_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={
                                            getRoleUser.AGM_MEDIA_PLANNING_AND_PROCUREMENT
                                        }
                                        dept={
                                            GetHierarchByDeptProps.MEDIA_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        AGM, Media Planning and Procurement
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={getRoleUser.AM_MEDIA}
                                            dept={
                                                GetHierarchByDeptProps.MEDIA_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            AM ,Media
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.EXECUTIVE_MEDIA
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.MEDIA_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Executive,Media
                                            </StyledNode>
                                        }
                                    ></TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* MEDIA Production*/}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={
                                    GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT
                                }
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Media (Production) Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.AVP_MEDIA_PRODUCTION}
                                    dept={
                                        GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={
                                            getRoleUser.SR_MANAGER_MEDIA_PRODUCTION
                                        }
                                        dept={
                                            GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        Sr. Manager, Media Production
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={getRoleUser.SR_EDITOR}
                                            dept={
                                                GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Sr. Editor
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.VIDEO_EDITOR
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Video Editor
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode
                                                    userRole={
                                                        getRoleUser.ASSOCIATE_EDITOR
                                                    }
                                                    dept={
                                                        GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT
                                                    }
                                                    extraClasses="text-sm font-normal font-sans"
                                                >
                                                    Associate Editor
                                                </StyledNode>
                                            }
                                        ></TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/*  Information Technology*/}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={GetHierarchByDeptProps.IT_DEPARTMENT}
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Information Technology Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.IT_AVP}
                                    dept={GetHierarchByDeptProps.IT_DEPARTMENT}
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={
                                            getRoleUser.MANAGER_SYSTEM_AND_NETWORK
                                        }
                                        dept={
                                            GetHierarchByDeptProps.IT_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        Manager, Systems & Network
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.MANAGER_SERVER_AND_IT
                                            }
                                            dept={
                                                GetHierarchByDeptProps.IT_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Manager, Server & IT
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.MANAGER_TELECOM_AND_TECHNOLOGY
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.IT_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Manager,Telecom and Technology
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode
                                                    userRole={
                                                        getRoleUser.AM_NETWORK
                                                    }
                                                    dept={
                                                        GetHierarchByDeptProps.IT_DEPARTMENT
                                                    }
                                                    extraClasses="text-sm font-normal font-sans"
                                                >
                                                    AM, Network
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode
                                                        userRole={
                                                            getRoleUser.EXECUTIVE_NETWORK
                                                        }
                                                        dept={
                                                            GetHierarchByDeptProps.IT_DEPARTMENT
                                                        }
                                                        extraClasses="text-sm font-normal font-sans"
                                                    >
                                                        Executive,Network
                                                    </StyledNode>
                                                }
                                            >
                                                <TreeNode
                                                    label={
                                                        <StyledNode
                                                            userRole={
                                                                getRoleUser.EXECUTIVE_IT
                                                            }
                                                            dept={
                                                                GetHierarchByDeptProps.IT_DEPARTMENT
                                                            }
                                                            extraClasses="text-sm font-normal font-sans"
                                                        >
                                                            Executive,IT
                                                        </StyledNode>
                                                    }
                                                ></TreeNode>
                                            </TreeNode>
                                        </TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* Development*/}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={
                                    GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT
                                }
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Creative Production Dept.
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.DEVELOPMENT_AVP}
                                    dept={
                                        GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={getRoleUser.GRAPHIC_DESIGNER}
                                        dept={
                                            GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        Graphic Designer
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.PRODUCT_DEVELOPMENT_AND_RESEARCH
                                            }
                                            dept={
                                                GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Product Development & Research
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.SR_3D_ARTIST
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Sr. 3-D Artist
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode
                                                    userRole={
                                                        getRoleUser.SR_VFX_ARTIST
                                                    }
                                                    dept={
                                                        GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT
                                                    }
                                                    extraClasses="text-sm font-normal font-sans"
                                                >
                                                    Sr. VFx Artist
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode
                                                        userRole={
                                                            getRoleUser.SR_VISUALIZE
                                                        }
                                                        dept={
                                                            GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT
                                                        }
                                                        extraClasses="text-sm font-normal font-sans"
                                                    >
                                                        Sr. Visualize
                                                    </StyledNode>
                                                }
                                            ></TreeNode>
                                        </TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/*  Web Development*/}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={GetHierarchByDeptProps.WEB_DEPARTMENT}
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Web Development Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.WEB_DEVELOPMENT_AVP}
                                    dept={GetHierarchByDeptProps.WEB_DEPARTMENT}
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={
                                            getRoleUser.SR_MANAGER_DIGITAL_SALES
                                        }
                                        dept={
                                            GetHierarchByDeptProps.WEB_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        Sr. Manager, Digital Sales
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.SR_MANAGER_SEO
                                            }
                                            dept={
                                                GetHierarchByDeptProps.WEB_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Sr. Manager,SEO
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.MANAGER_SEO
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.WEB_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Manager,SEO
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode
                                                    userRole={
                                                        getRoleUser.EXECUTIVE_SEO
                                                    }
                                                    dept={
                                                        GetHierarchByDeptProps.WEB_DEPARTMENT
                                                    }
                                                    extraClasses="text-sm font-normal font-sans"
                                                >
                                                    Executive,SEO
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode
                                                        userRole={
                                                            getRoleUser.CONTENT_CREATOR
                                                        }
                                                        dept={
                                                            GetHierarchByDeptProps.WEB_DEPARTMENT
                                                        }
                                                        extraClasses="text-sm font-normal font-sans"
                                                    >
                                                        Content Creator
                                                    </StyledNode>
                                                }
                                            >
                                                <TreeNode
                                                    label={
                                                        <StyledNode
                                                            userRole={
                                                                getRoleUser.CONTENT_WRITER
                                                            }
                                                            dept={
                                                                GetHierarchByDeptProps.WEB_DEPARTMENT
                                                            }
                                                            extraClasses="text-sm font-normal font-sans"
                                                        >
                                                            Content Writer
                                                        </StyledNode>
                                                    }
                                                >
                                                    <TreeNode
                                                        label={
                                                            <StyledNode
                                                                userRole={
                                                                    getRoleUser.FRONTEND_DEVELOPER
                                                                }
                                                                dept={
                                                                    GetHierarchByDeptProps.WEB_DEPARTMENT
                                                                }
                                                                extraClasses="text-sm font-normal font-sans"
                                                            >
                                                                Frontend
                                                                Developer
                                                            </StyledNode>
                                                        }
                                                    >
                                                        <TreeNode
                                                            label={
                                                                <StyledNode
                                                                    userRole={
                                                                        getRoleUser.GRAPHIC_DESIGNER_WEB
                                                                    }
                                                                    dept={
                                                                        GetHierarchByDeptProps.WEB_DEPARTMENT
                                                                    }
                                                                    extraClasses="text-sm font-normal font-sans"
                                                                >
                                                                    Graphic
                                                                    Designer
                                                                </StyledNode>
                                                            }
                                                        >
                                                            <TreeNode
                                                                label={
                                                                    <StyledNode
                                                                        userRole={
                                                                            getRoleUser.JR_WEB_DEVELOPER
                                                                        }
                                                                        dept={
                                                                            GetHierarchByDeptProps.WEB_DEPARTMENT
                                                                        }
                                                                        extraClasses="text-sm font-normal font-sans"
                                                                    >
                                                                        Jr. Web
                                                                        Developer
                                                                    </StyledNode>
                                                                }
                                                            >
                                                                {/* <TreeNode
                                                                    label={
                                                                        <StyledNode
                                                                            userRole={getRoleUser.SR_MANAGER_DIGITAL_SALES}
                                                                            dept={
                                                                                GetHierarchByDeptProps.WEB_DEPARTMENT
                                                                            }
                                                                            extraClasses="text-sm font-normal font-sans"
                                                                        >
                                                                          Sr. Manager, Digital Sales
                                                                        </StyledNode>
                                                                    }
                                                                > */}
                                                                <TreeNode
                                                                    label={
                                                                        <StyledNode
                                                                            userRole={
                                                                                getRoleUser.SR_WEB_DEVELOPER
                                                                            }
                                                                            dept={
                                                                                GetHierarchByDeptProps.WEB_DEPARTMENT
                                                                            }
                                                                            extraClasses="text-sm font-normal font-sans"
                                                                        >
                                                                            Sr.
                                                                            Web
                                                                            Developer
                                                                        </StyledNode>
                                                                    }
                                                                >
                                                                    <TreeNode
                                                                        label={
                                                                            <StyledNode
                                                                                userRole={
                                                                                    getRoleUser.WEB_DEVELOPER
                                                                                }
                                                                                dept={
                                                                                    GetHierarchByDeptProps.WEB_DEPARTMENT
                                                                                }
                                                                                extraClasses="text-sm font-normal font-sans"
                                                                            >
                                                                                Web
                                                                                Developer
                                                                            </StyledNode>
                                                                        }
                                                                    ></TreeNode>
                                                                    {/* </TreeNode> */}
                                                                </TreeNode>
                                                            </TreeNode>
                                                        </TreeNode>
                                                    </TreeNode>
                                                </TreeNode>
                                            </TreeNode>
                                        </TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* Operations*/}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={
                                    GetHierarchByDeptProps.OPERATION_DEPARTMENT
                                }
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Operations Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.AVP_OPERATIONS}
                                    dept={
                                        GetHierarchByDeptProps.OPERATION_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={getRoleUser.VP_OPERATIONS}
                                        dept={
                                            GetHierarchByDeptProps.OPERATION_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        VP,Operations
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.AGM_COMPLIANCE
                                            }
                                            dept={
                                                GetHierarchByDeptProps.OPERATION_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            AGM, Compliance
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.AGM_OPERATIONS
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.OPERATION_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                AGM, Operations
                                            </StyledNode>
                                        }
                                    ></TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* Quality Analyst*/}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={GetHierarchByDeptProps.QUALITY_DEPARTMENT}
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Quality Analyst Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.QA_AVP}
                                    dept={
                                        GetHierarchByDeptProps.QUALITY_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={
                                            getRoleUser.AM_QUALITY_ANALYST
                                        }
                                        dept={
                                            GetHierarchByDeptProps.QUALITY_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        AM,Quality Analyst
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.TEAM_LEADER_QUALITY_ANALYST
                                            }
                                            dept={
                                                GetHierarchByDeptProps.QUALITY_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Team Leader,Quality Analyst
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.EXECUTIVE_QUALITY_ANALYST
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.QUALITY_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Executive,Quality Analyst
                                            </StyledNode>
                                        }
                                    ></TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* Logistics */}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={
                                    GetHierarchByDeptProps.LOGISTIC_DEPARTMENT
                                }
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Logistics Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.LOGISTICS_AVP}
                                    dept={
                                        GetHierarchByDeptProps.LOGISTIC_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={getRoleUser.MANAGER_LOGISTICS}
                                        dept={
                                            GetHierarchByDeptProps.LOGISTIC_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        Manager, Logistics
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={getRoleUser.AM_LOGISTICS}
                                            dept={
                                                GetHierarchByDeptProps.LOGISTIC_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            AM, Logistics
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.EXECUTIVE_LOGISTICS
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.LOGISTIC_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Executive,Logistics
                                            </StyledNode>
                                        }
                                    ></TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* Mapping & MIS */}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={
                                    GetHierarchByDeptProps.MAPPING_AND_MIS_DEPARTMENT
                                }
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Mapping & MIS Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.MAPPING_AVP}
                                    dept={
                                        GetHierarchByDeptProps.MAPPING_AND_MIS_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={getRoleUser.MANAGER_MIS}
                                        dept={
                                            GetHierarchByDeptProps.MAPPING_AND_MIS_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        Manager, MIS
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={getRoleUser.EXECUTIVE_MIS}
                                            dept={
                                                GetHierarchByDeptProps.MAPPING_AND_MIS_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Executive,MIS
                                        </StyledNode>
                                    }
                                ></TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* Admin */}
                    <TreeNode
                        label={
                            <StyledNode
                                isMenu={false}
                                dept={GetHierarchByDeptProps.ADMIN_DEPARTMENT}
                                extraClasses="text-sm font-bold  font-sans"
                            >
                                Admin Dept
                            </StyledNode>
                        }
                    >
                        <TreeNode
                            label={
                                <StyledNode
                                    userRole={getRoleUser.ADMIN_AVP}
                                    dept={
                                        GetHierarchByDeptProps.ADMIN_DEPARTMENT
                                    }
                                    extraClasses="text-sm font-normal font-sans"
                                >
                                    AVP
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode
                                        userRole={getRoleUser.MANAGER_ADMIN}
                                        dept={
                                            GetHierarchByDeptProps.ADMIN_DEPARTMENT
                                        }
                                        extraClasses="text-sm font-normal font-sans"
                                    >
                                        Manager, Admin
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode
                                            userRole={
                                                getRoleUser.SR_EXECUTIVE_ADMIN
                                            }
                                            dept={
                                                GetHierarchByDeptProps.ADMIN_DEPARTMENT
                                            }
                                            extraClasses="text-sm font-normal font-sans"
                                        >
                                            Sr. Executive,Admin
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode
                                                userRole={
                                                    getRoleUser.EXECUTIVE_ADMIN
                                                }
                                                dept={
                                                    GetHierarchByDeptProps.ADMIN_DEPARTMENT
                                                }
                                                extraClasses="text-sm font-normal font-sans"
                                            >
                                                Executive,Admin
                                            </StyledNode>
                                        }
                                    ></TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                </Tree>
            </div>
        </div>
    )
}

export default OrganisationHierarchy
