import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Utensils, 
  Package, 
  TrendingUp, 
  BrainCircuit, 
  Menu as MenuIcon, 
  Users as StaffIcon,
  Clock,
  Calendar as CalendarIcon,
  X,
  ChevronRight,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { cn } from './lib/utils';
import { MENU_ITEMS, SALES_HISTORY, INVENTORY_ITEMS, STAFF, SHIFTS, WEEK_DAYS } from './constants';
import { getRestaurantInsights } from './services/geminiService';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'inventory' | 'staff' | 'ai'>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [aiInsights, setAiInsights] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    // Generate AI insights on mount
    const fetchInsights = async () => {
      setLoadingAI(true);
      const insights = await getRestaurantInsights({ 
        menu: MENU_ITEMS, 
        sales: SALES_HISTORY, 
        inventory: INVENTORY_ITEMS,
        staff: STAFF,
        shifts: SHIFTS
      });
      setAiInsights(insights);
      setLoadingAI(false);
    };
    fetchInsights();
  }, []);

  const totalRevenue = SALES_HISTORY.reduce((sum, day) => sum + day.revenue, 0);
  const avgProfitMargin = 68.5; // Dummy %

  const getDayShifts = (day: string) => SHIFTS.filter(s => s.day === day);
  const getStaffName = (id: string) => STAFF.find(s => s.id === id)?.name || 'Inconnu';
  const getStaffColor = (id: string) => STAFF.find(s => s.id === id)?.color || '#94a3b8';

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col z-20"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 font-bold text-xl text-indigo-600"
            >
              <Utensils className="w-8 h-8" />
              <span>RestoYield</span>
            </motion.div>
          )}
          {!isSidebarOpen && <Utensils className="w-8 h-8 text-indigo-600 mx-auto" />}
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem 
            icon={<TrendingUp />} 
            label="Analyse Menu" 
            active={activeTab === 'menu'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('menu')}
          />
          <NavItem 
            icon={<Package />} 
            label="Stocks & Achats" 
            active={activeTab === 'inventory'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('inventory')}
          />
          <NavItem 
            icon={<StaffIcon />} 
            label="Planning Personnel" 
            active={activeTab === 'staff'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('staff')}
          />
          <NavItem 
            icon={<BrainCircuit />} 
            label="IA Insights" 
            active={activeTab === 'ai'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('ai')}
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-700 capitalize">
            {activeTab === 'dashboard' ? 'Tableau de Bord Global' : activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400">Restaurateur</span>
              <span className="text-sm font-medium">Bistrot de Paris</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
              BP
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <KpiCard 
                    title="CA Hebdomadaire" 
                    value={`${totalRevenue.toLocaleString()}€`} 
                    trend="+12.5%" 
                    isPositive={true}
                  />
                  <KpiCard 
                    title="Marge Brute Avg" 
                    value={`${avgProfitMargin}%`} 
                    trend="-1.2%" 
                    isPositive={false}
                  />
                  <KpiCard 
                    title="Tickets Moyens" 
                    value="42.50€" 
                    trend="+4.3%" 
                    isPositive={true}
                  />
                  <KpiCard 
                    title="Coûts Labor" 
                    value="28.4%" 
                    trend="-2.1%" 
                    isPositive={true} // Lower labor cost is good
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-lg">Évolution du CA (7 derniers jours)</h3>
                    </div>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={SALES_HISTORY}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between">
                    <div>
                      <BrainCircuit className="w-12 h-12 mb-4 opacity-50" />
                      <h3 className="text-xl font-bold mb-2">IA Insights</h3>
                      <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                        {loadingAI ? "Analyse en cours..." : "L'IA a détecté des opportunités pour optimiser vos marges ce week-end."}
                      </p>
                      {!loadingAI && (
                        <div className="space-y-4">
                          <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-200 mb-1">Prévision</p>
                            <p className="font-medium">+15% de fréquentation attendue samedi suite à la météo.</p>
                          </div>
                          <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-200 mb-1">Action</p>
                            <p className="font-medium">Augmenter le stock de "Berger Maison" de 20kg.</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => setActiveTab('ai')}
                      className="mt-6 w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      Voir l'audit complet <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.div 
                key="menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-2xl border border-slate-200">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">Menu Engineering</h3>
                    <p className="text-slate-500">Visualisez la rentabilité vs la popularité de vos plats.</p>
                  </div>
                  
                  <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis 
                          type="number" 
                          dataKey="popularity" 
                          name="Popularité" 
                          label={{ value: 'Popularité (Ventes)', position: 'insideBottom', offset: -10 }}
                          stroke="#94a3b8"
                        />
                        <YAxis 
                          type="number" 
                          dataKey="profit" 
                          name="Marge brute" 
                          unit="€" 
                          label={{ value: 'Marge (€)', angle: -90, position: 'insideLeft' }}
                          stroke="#94a3b8"
                        />
                        <ZAxis type="number" dataKey="price" range={[100, 1000]} name="Prix" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<MenuTooltip />} />
                        <Scatter name="Plats" data={MENU_ITEMS} fill="#6366f1">
                          {MENU_ITEMS.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.profit > 15 ? '#22c55e' : '#6366f1'} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <MatrixZone color="bg-green-50 text-green-700" border="border-green-100" title="STARS" desc="Haute marge, Haute popularité" />
                    <MatrixZone color="bg-indigo-50 text-indigo-700" border="border-indigo-100" title="PLOWHORSES" desc="Basse marge, Haute popularité" />
                    <MatrixZone color="bg-orange-50 text-orange-700" border="border-orange-100" title="PUZZLES" desc="Haute marge, Basse popularité" />
                    <MatrixZone color="bg-red-50 text-red-700" border="border-red-100" title="DOGS" desc="Basse marge, Basse popularité" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'inventory' && (
              <motion.div 
                key="inventory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-700">Article</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Stock Actuel</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Prévision (7j)</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Statut</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {INVENTORY_ITEMS.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4">{item.currentStock} {item.unit}</td>
                        <td className="px-6 py-4 font-semibold text-indigo-600">~{item.predictedDemand} {item.unit}</td>
                        <td className="px-6 py-4">
                          {item.currentStock < item.minThreshold ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider">
                              <TrendingDown size={14} /> Critique
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-bold uppercase tracking-wider">
                              Optimal
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-indigo-600 font-semibold hover:underline">Acheter</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {activeTab === 'staff' && (
              <motion.div 
                key="staff"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {STAFF.map(member => (
                    <div key={member.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: member.color }}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold">{member.name}</p>
                        <p className="text-xs text-slate-500 uppercase font-black">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-xl flex items-center gap-2">
                       <CalendarIcon className="text-indigo-600" /> Semaine en cours
                    </h3>
                    <div className="flex gap-2">
                       <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">Semaine Précédente</button>
                       <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 transition-transform active:scale-95">Ajouter un Shift</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                    {WEEK_DAYS.map(day => (
                      <div key={day} className="px-4 py-3 text-center border-r border-slate-100 last:border-r-0">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{day}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 min-h-[400px]">
                    {WEEK_DAYS.map(day => (
                      <div key={day} className="border-r border-slate-100 last:border-r-0 p-3 space-y-3">
                        {getDayShifts(day).length > 0 ? (
                          getDayShifts(day).map(shift => (
                            <div 
                              key={shift.id} 
                              className="p-3 rounded-lg border-l-4 shadow-sm group relative hover:translate-y-[-2px] transition-transform"
                              style={{ 
                                backgroundColor: `${getStaffColor(shift.staffId)}10`, 
                                borderLeftColor: getStaffColor(shift.staffId) 
                              }}
                            >
                              <p className="text-xs font-bold text-slate-700 truncate">{getStaffName(shift.staffId)}</p>
                              <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                                <Clock size={10} /> {shift.startTime} - {shift.endTime}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-100 rounded-xl">
                            <span className="text-[10px] text-slate-300 font-bold uppercase rotate-90">Repos</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="bg-white p-6 rounded-2xl border border-slate-200">
                      <h4 className="font-bold mb-6">Répartition des heures par rôle</h4>
                      <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { role: 'Cuisine', hours: 85 },
                              { role: 'Service', hours: 120 },
                              { role: 'Management', hours: 40 }
                            ]}>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                               <XAxis dataKey="role" axisLine={false} tickLine={false} stroke="#94a3b8" />
                               <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" />
                               <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                         </ResponsiveContainer>
                      </div>
                   </div>
                   <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-2xl">
                      <h4 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
                         <BrainCircuit className="text-indigo-600" /> Analyse du Coût Labor
                      </h4>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                            <span className="text-sm text-slate-600">Total Salaires (Semaine)</span>
                            <span className="font-black text-lg">3,450€</span>
                         </div>
                         <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                            <span className="text-sm text-slate-600">Ratio Labor / CA</span>
                            <span className="font-black text-lg text-green-600">18.4%</span>
                         </div>
                         <p className="text-xs text-indigo-700 italic bg-white/50 p-4 rounded-xl border border-indigo-100">
                            "Votre coût de main-d'œuvre est excellent (inférieur à 20%). Vous pourriez envisager de rajouter un commis le samedi soir pour fluidifier le service sans impacter significativement votre rentabilité."
                         </p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div 
                key="ai"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                <div className="bg-indigo-600 p-12 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
                  <BrainCircuit className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
                  <h2 className="text-3xl font-extrabold mb-4">Stratégie Optimisée par Gemini</h2>
                  <p className="text-indigo-100 text-lg">Analyse en temps réel de votre établissement</p>
                </div>

                <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm prose prose-indigo max-w-none">
                  {loadingAI ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-100 rounded w-full"></div>
                      <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                    </div>
                  ) : (
                    <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
                      {aiInsights}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, expanded, onClick }: { icon: ReactNode, label: string, active: boolean, expanded: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 group relative",
        active ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
      )}
    >
      <div className={cn("transition-transform duration-200", active && "scale-110")}>
        {icon}
      </div>
      {expanded && (
        <span className="font-semibold text-sm whitespace-nowrap">{label}</span>
      )}
      {!expanded && active && (
        <div className="absolute left-0 w-1.5 h-6 bg-indigo-600 rounded-r-full" />
      )}
    </button>
  );
}

function KpiCard({ title, value, trend, isPositive }: { title: string, value: string, trend: string, isPositive: boolean }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-slate-500 mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        <div className={cn(
          "flex items-center gap-1 text-sm font-bold px-2 py-0.5 rounded-lg",
          isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        )}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </div>
      </div>
    </div>
  );
}

function MatrixZone({ color, border, title, desc }: { color: string, border: string, title: string, desc: string }) {
  return (
    <div className={cn("p-4 rounded-xl border", color, border)}>
      <p className="text-xs font-black uppercase tracking-widest mb-1">{title}</p>
      <p className="text-[10px] opacity-80 leading-tight">{desc}</p>
    </div>
  );
}

function MenuTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-100 min-w-[180px]">
        <p className="font-bold text-slate-900 mb-1">{data.name}</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Prix:</span>
            <span className="font-medium">{data.price}€</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Profit:</span>
            <span className="font-medium text-green-600">{data.profit}€</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 mt-1 pt-1">
            <span className="text-slate-400">Ventes:</span>
            <span className="font-bold text-indigo-600">{data.popularity}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

