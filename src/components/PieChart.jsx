import { ResponsivePie } from "@nivo/pie";

import { useSelector } from "react-redux";

const PieChart = () => {
  const { products, category } = useSelector((state) => state.product);
  const mockPieData = [
    products.map((item) => {
      return {
        id: item.category,
        label: item.category,
        value: products.filter((product) => item.category === product.category)
          .length,
        color: `hsl( ${104 + Math.random() * 10}, 70%, 50%)`,
      };
    }),
  ];

  // remove the duplicate category
  let uniqueData = [];

  uniqueData = mockPieData[0].filter((value, index, self) => {
    return category.indexOf(value.id) === index;
  });

  return (
    <ResponsivePie
      data={uniqueData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#e0e0e0",
            },
          },
          legend: {
            text: {
              fill: "#e0e0e0",
            },
          },
          ticks: {
            line: {
              stroke: "#e0e0e0",
              strokeWidth: 1,
            },
            text: {
              fill: "#e0e0e0",
            },
          },
        },
        legends: {
          text: {
            fill: "#e0e0e0",
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={"#e0e0e0"}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
