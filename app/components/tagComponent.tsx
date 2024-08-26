
  import { useState } from 'react';
  import * as React from 'react';
  // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import Tabs from '@mui/material/Tabs';
  import Tab from '@mui/material/Tab';
  import Box from '@mui/material/Box';
  
  interface TagComponentProps {
    onTagChange: (tag: string) => void;
  }
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const TagComponent: React.FC<TagComponentProps> = ({ onTagChange }) => {


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch(newValue){
      case 0 :
        onTagChange('all');
      break;
      case 1 :
        onTagChange('Game Dev');
      break;
      case 2 :
        onTagChange('Web Dev');
      break;
      case 3 :
        onTagChange('AR Dev');
      break;
    }
  };
    const [value, setValue] = React.useState(0);

    return (
      // <Tabs defaultValue="all" onValueChange={handleTabChange} className=" pt-10 w-full flex justify-center sm:w-[600px] xl:w-[900px]">
      //   <TabsList>
      //     <TabsTrigger value="all">ALL</TabsTrigger>
      //     <TabsTrigger value="Game Dev">#Game Dev</TabsTrigger>
      //     <TabsTrigger value="Web Dev">#Web Dev</TabsTrigger>
      //     <TabsTrigger value="AR Dev">#AR</TabsTrigger>
      //   </TabsList>
      //   <TabsContent value="all"></TabsContent>
      //   <TabsContent value="Game Dev"></TabsContent>
      //   <TabsContent value="Web Dev"></TabsContent>
      //   <TabsContent value="AR"></TabsContent>
      // </Tabs>
    
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="ALL" {...a11yProps(0)} />
          <Tab label="Game Dev" {...a11yProps(1)} />
          <Tab label="Web Dev" {...a11yProps(2)} />
          <Tab label="AR Dev" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      </CustomTabPanel>
    </Box>
    
    
    );
  };
  
export default TagComponent;