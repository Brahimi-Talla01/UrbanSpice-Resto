import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { mois: 'Jan', revenus: 65 },
  { mois: 'Fév', revenus: 45 },
  { mois: 'Mar', revenus: 78 },
  { mois: 'Avr', revenus: 52 },
  { mois: 'Mai', revenus: 89 },
  { mois: 'Jun', revenus: 67 },
  { mois: 'Jul', revenus: 95 },
  { mois: 'Aoû', revenus: 73 },
];

const revenusTotal = data.reduce((acc, item) => acc + item.revenus, 0);

const DashboardChart = () => {
  return (
    <div className='h-64 bg-gradient-to-t from-orange-50 to-white rounded-lg p-4 relative overflow-hidden'>
      {/* Chart container */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="mois" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }} 
          />
          <Bar dataKey="revenus" fill="url(#colorRevenus)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#facc15" stopOpacity={0.9}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>

      {/* Labels overlay */}
      <div className='absolute top-2 left-0 text-2xl font-bold text-gray-900'>${revenusTotal}</div>
      <div className='absolute top-8 left-0 text-sm text-gray-500'>Revenus Totaux</div>
    </div>
  );
}


export default DashboardChart;
