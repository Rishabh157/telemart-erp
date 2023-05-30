import React, { ReactNode } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
// import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu from 'src/components/UI/atoms/ATMMenu/ATMMenu'
import { twMerge } from 'tailwind-merge'
import ConfigurationLayout from '../../ConfigurationLayout'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'

const StyledNode = ({
    children,
    extraClasses,
}: {
    children: ReactNode
    extraClasses?: string
}) => {
    return (
        <button
            className={twMerge(
                `py-1  rounded-lg border inline-block bg-white shadow-xl  ${extraClasses}`
            )}
        >
            <div className="flex justify-between gap-3 items-center">
                <div className="px-4">{children}</div>
                <ATMMenu
                    orientation="vertical"
                    options={[
                        {
                            label: 'Add Policy',
                            onClick: () => {
                                // alert('clicked')
                            },
                        },
                    ]}
                />
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
        <ConfigurationLayout>
            <div className="px-4 h-full pt-3  ">
                {/* Breadcrumbs */}
                <div className="h-[30px]">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="h-full py-4 overflow-auto ">
                    <Tree
                        lineWidth={'2px'}
                        lineHeight={'40px'}
                        lineColor={'#bbbbcc'}
                        lineBorderRadius={'10px'}
                        label={<StyledNode extraClasses=" ">Root</StyledNode>}
                    >
                        {/*  Sales */}
                        <TreeNode
                            label={
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Sales Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            AGM Sales
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Manager, Sales Center
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                    Asst. Manager, Sales Center
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                                        Sr. Team
                                                        Leader/Sr.Executive, MIS
                                                    </StyledNode>
                                                }
                                            >
                                                <TreeNode
                                                    label={
                                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                                            Sr. Team
                                                            Leader/Sr.Executive,
                                                            MIS
                                                        </StyledNode>
                                                    }
                                                >
                                                    <TreeNode
                                                        label={
                                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                                Sr. Team
                                                                Leader/Sr.Executive,
                                                                MIS
                                                            </StyledNode>
                                                        }
                                                    >
                                                        <TreeNode
                                                            label={
                                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                                    Sr. Team
                                                                    Leader/Sr.Executive,
                                                                    MIS
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
                        {/* </TreeNode> */}
                        {/*  HR */}
                        <TreeNode
                            label={
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    HR Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVM
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            AGM, HR & Statutory Compliance
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Asst. Manager,HR
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                    Sr. Executive,HR
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Distribution Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVM
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Sr. Manager, Distribution
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Manager,Area
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                    Sr. Executive,Area
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Finance Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            AGM ,Finance
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Sr. Manager, Finance
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                    Manager, Finance
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                                        AM, Finance
                                                    </StyledNode>
                                                }
                                            >
                                                <TreeNode
                                                    label={
                                                        <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Media Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            AGM, Media Planning and Procurement
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                AM ,Media
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Media (Production) Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Sr. Manager, Media Production
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Sr. Editor
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                    Video Editor
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Information Technology Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Manager, Systems & Network
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Manager, Server & IT
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                    Manager,Telecom and
                                                    Technology
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                                        AM, Network
                                                    </StyledNode>
                                                }
                                            >
                                                <TreeNode
                                                    label={
                                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                                            Executive,Network
                                                        </StyledNode>
                                                    }
                                                >
                                                    <TreeNode
                                                        label={
                                                            <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Development Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Graphic Designer
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Product Development & Research
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                    Sr. 3-D Artist
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                                        Sr. VFx Artist
                                                    </StyledNode>
                                                }
                                            >
                                                <TreeNode
                                                    label={
                                                        <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Web Development Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Sr. Manager, Digital Sales
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Sr. Manager,SEO
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                    Manager,SEO
                                                </StyledNode>
                                            }
                                        >
                                            <TreeNode
                                                label={
                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                                        Executive,SEO
                                                    </StyledNode>
                                                }
                                            >
                                                <TreeNode
                                                    label={
                                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                                            Content Creator
                                                        </StyledNode>
                                                    }
                                                >
                                                    <TreeNode
                                                        label={
                                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                                Content Writer
                                                            </StyledNode>
                                                        }
                                                    >
                                                        <TreeNode
                                                            label={
                                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                                    Frontend
                                                                    Developer
                                                                </StyledNode>
                                                            }
                                                        >
                                                            <TreeNode
                                                                label={
                                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                                                        Graphic
                                                                        Designer
                                                                    </StyledNode>
                                                                }
                                                            >
                                                                <TreeNode
                                                                    label={
                                                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                                                            Jr.
                                                                            Web
                                                                            Developer
                                                                        </StyledNode>
                                                                    }
                                                                >
                                                                    <TreeNode
                                                                        label={
                                                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                                                Sr.
                                                                                Manager,
                                                                                Digital
                                                                                Sales
                                                                            </StyledNode>
                                                                        }
                                                                    >
                                                                        <TreeNode
                                                                            label={
                                                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                                                    Sr.
                                                                                    Web
                                                                                    Developer
                                                                                </StyledNode>
                                                                            }
                                                                        >
                                                                            <TreeNode
                                                                                label={
                                                                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                                                                        Web
                                                                                        Developer
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
                                            </TreeNode>
                                        </TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                        {/* Operations*/}
                        <TreeNode
                            label={
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Operations Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            VP,Operations
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                AGM, Compliance
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Quality Analyst Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            AM,Quality Analyst
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Team Leader,Quality Analyst
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Quality Analyst Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Manager, Logistics
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                AM, Logistics
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Mapping & MIS Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Manager, MIS
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
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
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Mapping & MIS Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        AVP
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Manager, Admin
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode extraClasses="text-sm font-normal font-sans">
                                                Sr. Executive,Admin
                                            </StyledNode>
                                        }
                                    >
                                        <TreeNode
                                            label={
                                                <StyledNode extraClasses="text-sm font-normal font-sans">
                                                    Executive,Admin
                                                </StyledNode>
                                            }
                                        ></TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                        <TreeNode
                            label={
                                <StyledNode extraClasses="text-sm font-normal  font-sans">
                                    Account Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        Manager
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Team Lead
                                        </StyledNode>
                                    }
                                />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode
                            label={
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Procurement Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        Manager
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Team Lead
                                        </StyledNode>
                                    }
                                />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode
                            label={
                                <StyledNode extraClasses="text-sm font-bold  font-sans">
                                    Callcenter Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        Manager
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Team Lead
                                        </StyledNode>
                                    }
                                />
                            </TreeNode>
                        </TreeNode>

                        <TreeNode
                            label={
                                <StyledNode extraClasses="text-sm font-bold font-sans">
                                    Creatives Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        Manager
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Team Lead
                                        </StyledNode>
                                    }
                                />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode
                            label={
                                <StyledNode extraClasses="text-sm font-bold font-sans">
                                    Warehouse Dept. Head
                                </StyledNode>
                            }
                        >
                            <TreeNode
                                label={
                                    <StyledNode extraClasses="text-sm font-normal font-sans">
                                        Manager
                                    </StyledNode>
                                }
                            >
                                <TreeNode
                                    label={
                                        <StyledNode extraClasses="text-sm font-normal font-sans">
                                            Team Lead
                                        </StyledNode>
                                    }
                                />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                </div>
            </div>
        </ConfigurationLayout>
    )
}

export default OrganisationHierarchy
